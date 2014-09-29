/**
 * @class ApplicationFactory
 *
 * @author: darryl.west@raincitysoftware.com
 * @created: 8/11/14 5:37 PM
 */
var app = '../../app',
    services = app + '/services',
    delegates = app + '/delegates',
    dao = app + '/dao',
    express = require('express' ),
    dash = require('lodash' ),
    AbstractApplicationFactory = require( 'node-service-commons' ).controllers.AbstractApplicationFactory,
    BootStrap = require( 'node-service-commons' ).controllers.CommonBootStrap,
    LogManager = require('simple-node-logger' ),
    Config = require('./config' ),
    ServiceFactory = require('./ServiceFactory');

var ApplicationFactory = function(options) {
    'use strict';

    var factory = this,
        log = options.log,
        serviceFactory = options.serviceFactory,
        webServiceList = [
            'IndexPageService',
            'WebStatusService',
            'AccessWebService'
        ];

    AbstractApplicationFactory.extend( this, options );

    this.createServiceFactory = function() {
        if (!serviceFactory) {
            log.info('create the service factory');

            var opts = dash.clone( options );
            opts.createLogger = factory.createLogger;
            opts.log = factory.createLogger( 'ServiceFactory' );

            serviceFactory = new ServiceFactory( opts );
        }

        return serviceFactory;
    };

    /**
     * start the web application
     *
     * @param app - an express or express-like object
     */
    this.startWebApplication = function(app) {
        var config = factory.getConfiguration();
        log.info('application starting with Version: ', config.version, ', for env: ', config.environment);

        factory.createWebServices( factory.createServiceFactory(), webServiceList );
        factory.initAppDefaults( app );
        factory.initMiddleware( app );

        factory.assignRoutes( app );

        app.listen( config.port );
        log.info('listening on port: ', config.port );
    };

    // create the logger for this and the abstract instances
    log = factory.createLogger('ApplicationFactory');
};

/**
 * static startup method that creates bootstrap to read the command line args and create config for the specified env
 */
ApplicationFactory.createInstance = function() {
    'use strict';

    var bootStrap = new BootStrap( Config.VERSION );

    var options = bootStrap.parseCommandLine( process.argv );

    // create the config file based on the specific env
    var config = Config[ options.env ]( options );

    var applicationFactory = new ApplicationFactory( config );

    return applicationFactory;
};

module.exports = ApplicationFactory;
