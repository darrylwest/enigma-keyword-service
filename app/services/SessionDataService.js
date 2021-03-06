/**
 * @class SessionDataService
 *
 * @author: darryl.west@roundpeg.com
 * @created: 10/28/14 7:32 AM
 */
var serviceName = 'SessionDataService',
    AbstractDataService = require('node-service-commons' ).services.AbstractDataService,
    SessionDocument = require('../models/SessionDocument' ),
    dash = require('lodash' ),
    uuid = require('node-uuid');

var SessionDataService = function(options) {
    'use strict';

    var service = this,
        log = options.log,
        dao = options.dao,
        dataSourceFactory = options.dataSourceFactory,
        smsurl = options.smsurl || 'messaging.sprintpcs.com';

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
            client,
            completeCallback,
            findCallback;

        // validate the model
        if (errors.length === 0) {
            if (model.id) {
                // add update validation
                client = dataSourceFactory.createRedisClient();

                // save a new salt or user code
                return dao.update( client, model, responseCallback );
            } else if (model.status === 'request') {
                this.processSessionRequest(model, responseCallback );
            } else if (model.status === 'challenge') {
                this.processChallengeResponse(model, responseCallback );
            }
        } else {
            log.warn('configuration update rejected: ', errors);
            return responseCallback( new Error( errors.join('; ') ));
        }
    };

    this.processSessionRequest = function(model, responseCallback) {
        log.info('process the session request');
        var client = dataSourceFactory.createRedisClient(),
            completeCallback,
            findCallback;

        // return only the session id and status or error
        completeCallback = function(err, session) {
            var obj = {};

            if (err) {
                log.error( err );
            } else if (session) {
                obj.status = session.status;
            }

            return responseCallback( err, obj );
        };

        findCallback = function(err, model) {
            if (err) {
                log.error( err );
                responseCallback( err );
            } else if (!model) {
                err = new Error('session not found for given code...');
                log.error( err );
                responseCallback( err );
            } else {
                model.challengeCode = service.createChallengeCode();

                service.sendChallenge( model );

                // update the challenge code and access time
                dao.update( client, model, completeCallback );
            }
        };

        // find the user from user code
        dao.findByUserCode( client, model.userCode, findCallback );
    };

    this.processChallengeResponse = function(model, responseCallback) {
        log.info('process the challenge response');

        var client = dataSourceFactory.createRedisClient(),
            completeCallback,
            findCallback,
            challengeCode = model.challengeCode;

        // return only the id and a web socket channel
        completeCallback = function(err, session) {
            var obj = {};

            if (err) {
                log.error( err );
            } else if (session) {
                obj.id = session.id;
                obj.channel = uuid.v4().replace(/-/g, '');
            }

            return responseCallback( err, obj );
        };

        findCallback = function(err, model) {
            if (err) {
                log.error( err );
                responseCallback( err );
            } else if (!model) {
                err = new Error('session not found for given code...');
                log.error( err );
                responseCallback( err );
            } else if (model.challengeCode === challengeCode) {
                log.info('consume the challenge code: ', challengeCode);
                model.challengeCode = "none";

                // update the challenge code and access time
                dao.update( client, model, completeCallback );
            } else {
                // wait for a while then send the rejection...
                setTimeout(function() {
                    err = new Error('challenge mismatch');
                    log.error( err );
                    return responseCallback( err );
                }, 5000);
            }
        };

        // find the user from user code
        dao.findByUserCode( client, model.userCode, findCallback );
    };

    this.sendChallenge = function(session) {
        var url = session.sms + '@' + smsurl,
            mailer = dataSourceFactory.createSESMailer(),
            model = mailer.createEMailModel();

        log.info('send challenge: ', session.challengeCode, ' to sms: ', url);

        model.setSource('support@raincitysoftware.com');
        model.setToAddress( url );
        model.setFrom( 'support@raincitysoftware.com' );
        model.setSubject('challenge code');
        model.setBody( session.challengeCode );

        mailer.send( model.createParams(), function(err, response) {
            if (err) {
                log.error( err );
            } else {
                log.info( response );
            }
        });


        return model;
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
            code = Math.round(Math.random() * n + (Math.random() * 10) * n ).toString( 19 ).replace('i', 'r');

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

        var callback = function(err, model) {
            var obj;
            if (err) {
                log.error( err );
            } else if (model) {
                obj = {};

                [ 'id', 'dateCreated', 'lastUpdated', 'version', 'salt' ].forEach(function(p) {
                    obj[ p ] = model[ p ];
                });
            }

            return responseCallback( err, obj );
        };

        dao.findById( client, id, callback );
    };

    // constructor validations
    if (!log) throw new Error("data service must be constructed with a log");
    if (!dataSourceFactory) throw new Error("data service must be constructed with a data source factory");
    if (!dao) throw new Error("data service must be constructed with a dao object");
};

SessionDataService.SERVICE_NAME = 'SessionDataService';

module.exports = SessionDataService;
