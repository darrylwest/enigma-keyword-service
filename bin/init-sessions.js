#!/usr/bin/env node

// dpw@alameda.local
// 2014.11.02
'use strict';

var dash = require('lodash'),
    fs = require('fs'),
    path = require('path'),
    crypto = require('crypto'),
    path = require('path'),
    home = process.env.HOME,
    dataSourceFactory,
    serviceFactory,
    sessionDao;

var JobRunner = function(jobs) {
    this.next = function() {
        var job = jobs.shift();

        if (job) {
            job();
        } else {
            console.log('jobs complete...');
        }
    };
};

var updateDatabase = function() {
    var runner,
        config = require( path.join( home, '.ssh/enigma-config.json' )),
        encryptedData,
        pepper,
        messaging,
        sessions,
        pw;

    var writeToDb = function() {
        var client = dataSourceFactory.createRedisClient(),
            callback,
            loop;

        callback = function(err, model) {
            if (err) throw err;

            console.log( model );
            loop();
        };

        loop = function() {
            var session = sessions.pop();

            if (session) {
                sessionDao.insert( client, session, callback );
            } else {
                client.quit();
                runner.next();
            }
        };

        loop();
    };

    var decrypt = function() {
        console.log('decrypt using: ', config.algo );

        var cipher = crypto.createDecipher( config.algo, pw );

        var plainData = cipher.update( encryptedData, config.encoding);
        plainData += cipher.final();

        // console.log( plainData );
        var obj = JSON.parse( plainData );

        sessions = obj.sessions;
        pepper = obj.pepper;
        messaging = obj.messaging;

        runner.next();
    };

    var createPassword = function() {
        var pepper = new Buffer( config.pepper ),
            salt = new Buffer( config.salt ),
            keylen = config.keylen,
            iters = config.iters;

        var callback = function(err, key) {
            if (err) throw err;
            pw = key;

            runner.next();
        };

        console.log('create the password key...');
        crypto.pbkdf2(pepper.toString() + config.password, salt, iters, keylen, callback);
    };

    var readData = function() {
        var file = path.join( home, config.outputFile );

        var callback = function(err, data) {
            if (err) throw err;

            encryptedData = data.toString() ;

            runner.next();
        };

        fs.readFile( file, callback );
    };

    runner = new JobRunner([ readData, createPassword, decrypt, writeToDb ]);
    runner.next()
};

var bootup = function() {
    var ApplicationFactory = require('../app/controllers/ApplicationFactory'),
        conf = require('../app-config.json'),
        Config = require('../app/controllers/Config'),
        factory;

    // force a local log...
    conf.logging = null;

    factory = new ApplicationFactory( new Config( conf ));

    serviceFactory = factory.createServiceFactory();
    dataSourceFactory = serviceFactory.createDataSourceFactory();
    sessionDao = serviceFactory.createSessionDao();
};

var find = function(code) {
    var client = dataSourceFactory.createRedisClient();

    console.log('find session by code: ', code);
    sessionDao.findByUserCode( client, code, function(err, model) {
        if (err) throw err;

        console.log( 'model: ', model );

        process.nextTick(function() {
            console.log('stop redis client...');
            client.quit();
        });
    });
};

// 'ca1c5-0f+UC';

bootup();
updateDatabase();


