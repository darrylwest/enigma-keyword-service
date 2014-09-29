#!/bin/sh
# dpw@alameda.local
# 2014.02.27
#

HOST='http://alameda.local:15061'

curl -H 'x-api-key:f804069e-472c-11e4-8207-0b0c205e8f2a' -X GET "${HOST}/EnigmaService/status"

