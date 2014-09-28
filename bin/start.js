#!/usr/bin/env node

// dpw@alameda.local
// 2014.09.28

var env = 'production',
    config = 'config.json',
    logfile = 'markup-service',
    cmd = [ 'node app/app.js --env  --configfile $CONFIG --logfile "${HOME}/logs/${LOGNAME}.log" > "../${LOGNAME}-nohup.log" &

