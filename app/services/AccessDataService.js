/**
 * @class MarkupDataService
 *
 * @author: darryl.west@raincitysoftware.com
 * @created: 8/12/14 4:13 PM
 */
var serviceName = 'AccessDataService',
    AbstractDataService = require('node-service-commons' ).services.AbstractDataService,
    AccessDocument = require('../models/AccessDocument');

var AccessDataService = function(options) {
    'use strict';

    var service = this,
        log = options.log,
        dao = options.dao,
        dataSourceFactory = options.dataSourceFactory;
        // could have a modelDelegate here for validation...

    AbstractDataService.extend( this, options );

    /**
     * return a list of all documents minus shapes
     *
     * @param params
     * @param responseCallback
     */
    this.query = function(params, responseCallback) {
        log.info('query access: ', params);

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
        log.info('save the access model: ', params);

        var model = new AccessDocument( params ),
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
            return responseCallback( new Error( errors.join('; ') ));
        }
    };

    this.validate = function(model, errors) {
        if (!errors) errors = [];

        if (!model.topic) {
            errors.push( 'access model must include a topic');
        }

        if (!model.title) {
            errors.push( 'access model must include a title' );
        }

        if (!model.status) {
            errors.push( 'access model must include a status code');
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
        log.info('find access for id: ', id);
        var client = dataSourceFactory.createRedisClient();

        dao.findById( client, id, responseCallback );
    };

    // constructor validations
    if (!log) throw new Error("data service must be constructed with a log");
    if (!dataSourceFactory) throw new Error("data service must be constructed with a data source factory");
    if (!dao) throw new Error("data service must be constructed with a dao object");
};

AccessDataService.SERVICE_NAME = 'AccessDataService';

module.exports = AccessDataService;
