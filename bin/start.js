#!/usr/bin/env node

// dpw@alameda.local
// 2014.09.28

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
    console.log('show status...');
}, 2500);



