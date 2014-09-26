/**
 * app startup
 *
 * @author: darryl.west@raincitysoftware.com
 * @created: 2014-09-26
 */
var applicationFactory = require('./controllers/ApplicationFactory' ).createInstance(),
    express = require('express' );

applicationFactory.startWebApplication( express() );
