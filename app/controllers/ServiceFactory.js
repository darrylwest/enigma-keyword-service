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
    AccessDao = require('../dao/AccessDao');

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

    // constructor validations
    if (!log) throw new Error('service factory must be constructed with a log');
    if (!createLogger) throw new Error('service factory must be constructed with a create logger method');
};

module.exports = ServiceFactory;
