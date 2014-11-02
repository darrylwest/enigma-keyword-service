#!/usr/bin/env node

// dpw@alameda.local
// 2014.11.02
'use strict';

var dash = require('lodash'),
    dataSourceFactory,
    serviceFactory,
    sessionDao,
    code = 'ca1c5-0F-+uC';

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

var find = function() {
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
}

bootup();
find();

