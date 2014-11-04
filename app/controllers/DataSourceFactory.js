/**
 * @class DataSourceFactory
 *
 * @author: darryl.west@raincitysoftware.com
 * @created: 9/5/14 6:46 PM
 */
var dash = require('lodash' ),
    AWSCommonsFactory = require('aws-commons' ).commons.AWSCommonsFactory,
    SESMailer = require('aws-commons' ).commons.SESMailer;

var DataSourceFactory = function(options) {
    'use strict';

    var factory = this,
        log = options.log,
        createLogger = options.createLogger,
        redis = options.redis || require('redis'),
        mailer = options.mailer,
        client,
        awsFactory;

    this.createRedisClient = function() {
        if (!client) {
            log.info('create the redis client');

            client = redis.createClient();
        }

        return client;
    };

    this.createSESMailer = function() {
        if (!mailer) {
            log.info('create the mailer');

            var opts = dash.clone( options );
            opts.log = log;
            opts.ses = awsFactory.createSESConnection();

            mailer = new SESMailer( opts );
        }

        return mailer;
    };

    // constructor validations
    if (!log) throw new Error("data source factory must be constructed with a log");
    if (!createLogger) throw new Error("data source factory must be constructed with a create logger method");

    if (!awsFactory) {
        log.info('create aws factory with keyfile: ', options.keyfile );
        var opts = dash.clone( options );
        opts.log = createLogger('AWSCommonsFactory');

        // keyfile is defined in external config...

        awsFactory = AWSCommonsFactory.createInstance( opts );
    }
};

module.exports = DataSourceFactory;
