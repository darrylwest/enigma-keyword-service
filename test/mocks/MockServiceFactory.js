/**
 * @class MockServiceFactory
 *
 * @author: darryl.west@raincitysoftware.com
 * @created: 8/12/14 4:23 PM
 */
var MockLogger = require('simple-node-logger').mocks.MockLogger,
    MockRedisClient = require('mock-redis-client' ),
    Config = require('../../app/controllers/Config' ),
    DataSourceFactory = require('../../app/controllers/DataSourceFactory' ),
    ServiceFactory = require('../../app/controllers/ServiceFactory');

var MockServiceFactory = { };

MockServiceFactory.createInstance = function() {
    'use strict';

    var opts = Config.test();

    opts.log = MockLogger.createLogger('ServiceFactory');
    opts.createLogger = MockLogger.createLogger;

    opts.redis = MockRedisClient.createMockRedis();

    opts.dataSourceFactory = new DataSourceFactory( opts );

    // set the mock redis

    return new ServiceFactory( opts );
};

module.exports = MockServiceFactory;
