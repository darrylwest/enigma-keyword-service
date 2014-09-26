#!/bin/sh
# dpw@alameda.local
# 2013.11.21
#

[ -d node_modules ] && {
    echo "node modules exist..."
} || {
    echo "installing node modules..."
    npm install
}

node app/app.js --env development

