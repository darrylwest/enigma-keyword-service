#!/bin/sh
# dpw@alameda.local
# 2014.02.27
#

ENV=production

PORT=15061
SERVICE=MarkupService
CONFIG="`pwd`/config.json"
LOGNAME="markup-service"

(
    cd app/
    nohup node app.js --env $ENV --configfile $CONFIG --logfile "${HOME}/logs/${LOGNAME}.log" > "../${LOGNAME}-nohup.log" &
)

sleep 2

curl -H 'x-api-key:dc0d9c98-21b6-11e4-902a-ff9a58d39bfe' -X GET "http://localhost:${PORT}/$SERVICE/status"

