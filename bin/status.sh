#!/bin/sh
# dpw@alameda.local
# 2014.02.27
#

HOST='http://alameda.local:15061'

curl -H 'x-api-key:dc0d9c98-21b6-11e4-902a-ff9a58d39bfe' -X GET "${HOST}/MarkupService/status"

