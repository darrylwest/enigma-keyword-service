#!/usr/bin/env node

// dpw@alameda.local
// 2014.10.27
'use strict';

var exec = require('child_process').exec,
    configFile = process.cwd() + '/app-config.json',
    conf = require( configFile );

var saveSession = function() {
    var resource = '/session',
        model = {
            userCode:'54ss43',
            status:'request'
        },
        data = "-d '" + JSON.stringify( model ) + "' ",
        cmd = "curl " + data + " -H 'Content-Type: application/json' -H 'x-api-key:" + conf.appkey + "' -X POST http://localhost:" + conf.port + conf.baseURI + resource + "/save";

    console.log( cmd );

    return cmd;
};

var saveConfiguration = function() {
    var resource = '/configuration',
        model = {
            id:'development',
            navigation:{
                appTitle:'My Application',
                links:[
                    { id:'home', label:'home' },
                    { id:'about', label:'about' },
                    { id:'logout', label:'logout' }
                ]
            },
            status:'active'
        },
        data = "-d '" + JSON.stringify( model ) + "' ",
        cmd = "curl " + data + " -H 'Content-Type: application/json' -H 'x-api-key:" + conf.appkey + "' -X PUT http://localhost:" + conf.port + conf.baseURI + resource + "/save/" + model.id;

    console.log( cmd );

    return cmd;
};

exec( saveSession(), function(err, stdout, stderr ) {
    if (err) {
        console.log( err );
    } else {
        console.log( stdout );
    }
    // if (stderr) console.log( stderr );
});
