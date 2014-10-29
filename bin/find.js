#!/usr/bin/env node

// dpw@alameda.local
// 2014.10.27
'use strict';

var exec = require('child_process').exec,
    configFile = process.cwd() + '/app-config.json',
    conf = require( configFile ),
    resource = '/session', // '/configuration',
    id = '7a8bc2ac66c942c7b360b59c722d11de', // 'development',
    cmd = "curl -H 'x-api-key:" + conf.appkey + "' -X GET http://localhost:" + conf.port + conf.baseURI + resource + "/find/" + id;

console.log( cmd );

exec( cmd, function(err, stdout, stderr ) {
    if (err) {
        console.log( err );
    } else {
        console.log( stdout );
    }
    // if (stderr) console.log( stderr );
});