#!/usr/bin/env node

// dpw@alameda.local
// 2014.09.28
'use strict';

var fs = require('fs'),
    spawn = require('child_process').spawn,
    env = 'production',
    configFile = process.cwd() + '/app-config.json',
    out = fs.openSync('./nohup.log', 'a'),
    err = fs.openSync('./nohup.log', 'a'),
    args = [ 'app/app.js', '--env', env, '--configfile', configFile  ],
    opts = {
        detached:true,
        stdio:[ 'ignore', out, err ]
    },
    child = spawn('node', args, opts );

console.log( 'pid: ', child.pid );
child.unref();

setTimeout(function() {
    var exec = require('child_process').exec;

    console.log('show status...');
    exec( 'bin/status.js', function(err, stdout, stderr) {
        if (err) {
            throw err;
        } else {
            console.log( stdout );
        }
    });

}, 2500);



