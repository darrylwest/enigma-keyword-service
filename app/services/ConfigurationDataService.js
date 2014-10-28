/**
 * @class ConfigurationDataService
 *
 * @author: darryl.west@roundpeg.com
 * @created: 10/27/14 4:18 PM
 */
var serviceName = 'AccessDataService',
    AbstractDataService = require('node-service-commons' ).services.AbstractDataService,
    ConfigurationDocument = require('../models/ConfigurationDocument');

var ConfigurationDataService = function(options) {
    'use strict';

    var service = this,
        log = options.log,
        dao = options.dao,
        dataSourceFactory = options.dataSourceFactory;

    AbstractDataService.extend( this, options );

    /**
     * return a list of all documents minus shapes
     *
     * @param params
     * @param responseCallback
     */
    this.query = function(params, responseCallback) {
        log.info('query configuration: ', params);

        var client = dataSourceFactory.createRedisClient();

        dao.query( client, params, responseCallback );
    };

    /**
     * override to implement; this method is invoked from web service to insert, update or delete a model
     *
     * @param params
     * @param responseCallback
     */
    this.save = function(params, responseCallback) {
        log.info('save the configuration model: ', params);

        var model = new ConfigurationDocument( params ),
            errors = service.validate( model ),
            client = dataSourceFactory.createRedisClient();

        // validate the model
        if (errors.length === 0) {
            if (model.id) {
                dao.update( client, model, responseCallback );
            } else {
                dao.insert( client, model, responseCallback );
            }
        } else {
            log.warn('configuration update rejected: ', errors);
            return responseCallback( new Error( errors.join('; ') ));
        }
    };

    this.validate = function(model, errors) {
        if (!errors) errors = [];

        // should have navigation node...
        if (!model.dateCreated) {
            model.dateCreated = new Date();
        }

        if (!model.lastUpdated) {
            model.lastUpdated = new Date();
        }

        if (!model.navigation) {
            errors.push('Configuration must include a navigation node');
        }

        if (!model.status) {
            errors.push('Configuration must include a status of active or inactive');
        }

        return errors;
    };

    /**
     * override to implement; this method is invoked from web service to find a single model
     *
     * @param params
     * @param responseCallback
     */
    this.find = function(id, responseCallback) {
        log.info('find configuration for id: ', id);
        var client = dataSourceFactory.createRedisClient();

        dao.findById( client, id, responseCallback );
    };

    // constructor validations
    if (!log) throw new Error("data service must be constructed with a log");
    if (!dataSourceFactory) throw new Error("data service must be constructed with a data source factory");
    if (!dao) throw new Error("data service must be constructed with a dao object");
};

ConfigurationDataService.SERVICE_NAME = 'ConfigurationDataService';

module.exports = ConfigurationDataService;
