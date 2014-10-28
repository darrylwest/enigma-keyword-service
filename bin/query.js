#!/usr/bin/env node

// dpw@alameda.local
// 2014.10.27
'use strict';

var exec = require('child_process').exec,
    configFile = process.cwd() + '/app-config.json',
    conf = require( configFile ),
    resource = '/session', // '/configuration',
    cmd = "curl -H 'x-api-key:" + conf.appkey + "' -X GET http://localhost:" + conf.port + conf.baseURI + resource + "/query";

console.log( cmd );

exec( cmd, function(err, stdout, stderr ) {
    if (err) {
        console.log( err );
    } else {
        console.log( stdout );
    }
    // if (stderr) console.log( stderr );
});
