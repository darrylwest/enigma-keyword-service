/**
 * @class DataSourceFactory
 *
 * @author: darryl.west@raincitysoftware.com
 * @created: 9/5/14 6:46 PM
 */
var DataSourceFactory = function(options) {
    'use strict';

    var factory = this,
        log = options.log,
        redis = options.redis || require('redis'),
        client;

    this.createRedisClient = function() {
        if (!client) {
            log.info('create the redis client');

            client = redis.createClient();
        }

        return client;
    };

    // constructor validations
    if (!log) throw new Error("data service must be constructed with a log");
};

module.exports = DataSourceFactory;
