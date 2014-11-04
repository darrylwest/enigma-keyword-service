/**
 * @class DataSourceFactoryTests
 *
 * @author: darryl.west@raincitysoftware.com
 * @created: 9/5/14 7:08 PM
 */
var should = require('chai').should(),
    dash = require('lodash' ),
    MockRedisClient = require('mock-redis-client' ),
    MockLogger = require('simple-node-logger').mocks.MockLogger,
    DataSourceFactory = require('../../app/controllers/DataSourceFactory');

describe('DataSourceFactory', function() {
    'use strict';

    var createOptions = function() {
        var opts = {};

        opts.log = MockLogger.createLogger( 'DataSourceFactory' );
        opts.createLogger = MockLogger.createLogger;
        opts.redis = MockRedisClient.createMockRedis();
        opts.keyfile = process.env.HOME + '/.ssh/keys.enc';

        return opts;
    };

    describe('#instance', function() {
        var factory = new DataSourceFactory( createOptions() ),
            methods = [
                'createRedisClient',
                'createSESMailer'
            ];

        it('should create an instance of MarkupDataService', function() {
            should.exist( factory );
            factory.should.be.instanceof( DataSourceFactory );
        });

        it('should have all known methods by size and type', function() {
            dash.methods( factory ).length.should.equal( methods.length );
            methods.forEach(function(method) {
                factory[ method ].should.be.a( 'function' );
            });
        });
    });

    describe('createRedisClient', function() {
        var opts = createOptions(),
            factory = new DataSourceFactory( opts );

        it('should create a redis client', function() {
            var client = factory.createRedisClient();

            should.exist( client );
        });
    });
});
