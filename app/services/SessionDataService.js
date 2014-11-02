/**
 * @class SessionDataService
 *
 * @author: darryl.west@roundpeg.com
 * @created: 10/28/14 7:32 AM
 */
var serviceName = 'SessionDataService',
    AbstractDataService = require('node-service-commons' ).services.AbstractDataService,
    SessionDocument = require('../models/SessionDocument' ),
    dash = require('lodash');

var SessionDataService = function(options) {
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
        log.info('query session: ', params);

        // always return an empty set...
        return responseCallback(null, []);
    };

    /**
     * save will trigger a new session when the user code is recognized;
     *
     * @param params
     * @param responseCallback
     */
    this.save = function(params, responseCallback) {
        log.info('save the session model: ', params);

        var model = new SessionDocument( params ),
            errors = service.validate( model ),
            client = dataSourceFactory.createRedisClient(),
            completeCallback;

        // return only the session id and status or error
        completeCallback = function(err, session) {
            var obj = {};

            obj.id = session.id;
            obj.status = session.status;

            return responseCallback( err, obj );
        };

        // validate the model
        if (errors.length === 0) {
            if (model.id) {
                // insure that the challenge matches the request
                // save a new salt or user code
                return dao.update( client, model, completeCallback );
            } else {
                // check for correct status = request
                if (model.status === 'request') {
                    model.status = 'pending';

                    // find the user from user code

                    model.challengeCode = service.createChallengeCode();

                    // send the challenge code to the user's SMS

                    return dao.insert( client, model, completeCallback );
                }
            }

            errors.push('malformed session request');
        }

        log.warn('configuration update rejected: ', errors);
        return responseCallback( new Error( errors.join('; ') ));
    };

    this.validate = function(model, errors) {
        if (!errors) errors = [];

        if (!model.userCode) {
            errors.push('Session must include a user code');
        }

        if (!model.status) {
            errors.push('Session must include a valid status code');
        }

        return errors;
    };

    this.createChallengeCode = function() {
        var n = 100000000,
            code = Math.round(Math.random() * n + n ).toString( 19 ).replace('i', 'r');

        log.info('challenge code: ', code);

        return code;
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

SessionDataService.SERVICE_NAME = 'SessionDataService';

module.exports = SessionDataService;
