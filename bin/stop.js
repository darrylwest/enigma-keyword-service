#!/usr/bin/env node

// dpw@alameda.local
// 2014.09.29
'use strict';

var exec = require('child_process').exec,
    configFile = process.cwd() + '/app-config.json',
    conf = require( configFile ),
    cmd = "curl -H 'x-api-key:" + conf.appkey + "' -X POST http://127.0.0.1:" + conf.port + "/shutdown";

exec( cmd, function(err, stdout, stderr ) {
    if (err) {
        console.log( err );
    } else {
        console.log( stdout );
    }
});

