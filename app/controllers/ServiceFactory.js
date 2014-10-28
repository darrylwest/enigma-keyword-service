/**
 * @class ServiceFactory
 *
 * @author: darryl.west@raincitysoftware.com
 * @created: 8/11/14 6:47 PM
 */
var services = '../services',
    delegates = '../delegates',
    dash = require( 'lodash' ),
    faye = require( 'faye' ),
    AbstractServiceFactory = require('node-service-commons' ).controllers.AbstractServiceFactory,
    DataSourceFactory = require('./DataSourceFactory' ),
    AccessDataService = require( services + '/AccessDataService' ),
    AccessWebService = require( services + '/AccessWebService'),
    AccessDao = require('../dao/AccessDao' ),
    SessionWebService = require( services + '/SessionWebService' ),
    SessionDataService = require( services + '/SessionDataService' ),
    SessionDao = require('../dao/SessionDao' ),
    ConfigurationWebService = require( services + '/ConfigurationWebService' ),
    ConfigurationDataService = require( services + '/ConfigurationDataService' ),
    ConfigurationDao = require('../dao/ConfigurationDao');

var ServiceFactory = function(options) {
    'use strict';

    var factory = this,
        createLogger = options.createLogger,
        log = options.log,
        dataSourceFactory = options.dataSourceFactory,
        services = {};

    AbstractServiceFactory.extend( this, options );

    this.createDataSourceFactory = function() {
        if (!dataSourceFactory) {
            log.info('create the data source factory for creating redis client');

            var opts = dash.clone( options );

            opts.createLogger('DataSourceFactory');

            dataSourceFactory = new DataSourceFactory(opts);
        }

        return dataSourceFactory;
    };

    this.createAccessWebService = function() {
        var service = services[ AccessWebService.SERVICE_NAME ];

        if (!service) {
            log.info('create the access web service');

            var opts = dash.clone( options );

            opts.log = createLogger( AccessWebService.SERVICE_NAME );
            opts.dataService = factory.createAccessDataService();

            opts.listName = 'accessList';
            opts.modelName = 'access';
            opts.domain = 'access';

            service = new AccessWebService( opts );

            services[ AccessWebService.SERVICE_NAME ] = service;
        }

        return service;
    };

    this.createAccessDataService = function() {
        var service = services[ AccessDataService.SERVICE_NAME ];

        if (!service) {
            log.info('create access data service');

            var opts = dash.clone( options );

            opts.log = createLogger( AccessDataService.SERVICE_NAME );
            opts.dao = factory.createAccessDao();
            opts.dataSourceFactory = factory.createDataSourceFactory();

            service = new AccessDataService( opts );

            services[ AccessDataService.SERVICE_NAME ] = service;
        }

        return service;
    };

    this.createSessionWebService = function() {
        var service = services[ SessionWebService.SERVICE_NAME ];

        if (!service) {
            log.info('create the access web service');

            var opts = dash.clone( options );

            opts.log = createLogger( SessionWebService.SERVICE_NAME );
            opts.dataService = factory.createSessionDataService();

            opts.listName = 'sessions';
            opts.modelName = 'session';
            opts.domain = 'session';

            service = new SessionWebService( opts );

            services[ SessionWebService.SERVICE_NAME ] = service;
        }

        return service;
    };

    this.createSessionDataService = function() {
        var service = services[ SessionDataService.SERVICE_NAME ];

        if (!service) {
            log.info('create session data service');

            var opts = dash.clone( options );

            opts.log = createLogger( SessionDataService.SERVICE_NAME );
            opts.dao = factory.createSessionDao();
            opts.dataSourceFactory = factory.createDataSourceFactory();

            service = new SessionDataService( opts );

            services[ SessionDataService.SERVICE_NAME ] = service;
        }

        return service;
    };

    this.createConfigurationWebService = function() {
        var service = services[ ConfigurationWebService.SERVICE_NAME ];

        if (!service) {
            log.info('create the configuration web service');

            var opts = dash.clone( options );

            opts.log = createLogger( ConfigurationWebService.SERVICE_NAME );
            opts.dataService = factory.createConfigurationDataService();

            opts.listName = 'configurationList';
            opts.modelName = 'configuration';
            opts.domain = 'configuration';

            service = new ConfigurationWebService( opts );

            services[ ConfigurationWebService.SERVICE_NAME ] = service;
        }

        return service;
    };

    this.createConfigurationDataService = function() {
        var service = services[ ConfigurationDataService.SERVICE_NAME ];

        if (!service) {
            log.info('create configuration data service');

            var opts = dash.clone( options );

            opts.log = createLogger( ConfigurationDataService.SERVICE_NAME );
            opts.dao = factory.createConfigurationDao();
            opts.dataSourceFactory = factory.createDataSourceFactory();

            service = new ConfigurationDataService( opts );

            services[ ConfigurationDataService.SERVICE_NAME ] = service;
        }

        return service;
    };

    this.createImageWebService = function() {
        var service; //  = services[ ImageWebService.SERVICE_NAME ];

        if (!service) {
            log.info('create the image web service');

            // services[ ImageWebService.SERVICE_NAME ] = service;
        }

        return service;
    };

    this.createSessionDao = function() {
        var dao = services[ SessionDao.DAO_NAME ];

        if (!dao) {
            log.info('create the session dao');

            var opts = dash.clone( options );
            opts.log = createLogger( SessionDao.DAO_NAME );
            opts.domain = 'Session';

            dao = new SessionDao( opts );

            services[ SessionDao.DAO_NAME ] = dao;
        }

        return dao;
    };

    // move this to a DaoFactory ?
    this.createAccessDao = function() {
        var dao = services[ AccessDao.DAO_NAME ];

        if (!dao) {
            log.info('create the access dao');

            var opts = dash.clone( options );
            opts.log = createLogger( AccessDao.DAO_NAME );
            opts.domain = 'Access';

            dao = new AccessDao( opts );

            services[ AccessDao.DAO_NAME ] = dao;
        }

        return dao;
    };

    this.createConfigurationDao = function() {
        var dao = services[ ConfigurationDao.DAO_NAME ];

        if (!dao) {
            log.info('create the configuration dao');

            var opts = dash.clone( options );
            opts.log = createLogger( ConfigurationDao.DAO_NAME );
            opts.domain = 'Configuration';

            dao = new ConfigurationDao( opts );

            services[ ConfigurationDao.DAO_NAME ] = dao;
        }

        return dao;
    };

    // constructor validations
    if (!log) throw new Error('service factory must be constructed with a log');
    if (!createLogger) throw new Error('service factory must be constructed with a create logger method');
};

module.exports = ServiceFactory;
