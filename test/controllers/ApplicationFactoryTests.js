/**
 * @class ApplicationFactoryTests
 *
 * @author: darryl.west@raincitysoftware.com
 * @created: 8/11/14 5:41 PM
 */
var should = require('chai').should(),
    dash = require('lodash' ),
    MockLogger = require('simple-node-logger').mocks.MockLogger,
    Config = require('../../app/controllers/Config'),
    ApplicationFactory = require('../../app/controllers/ApplicationFactory' ),
    ServiceFactory = require('../../app/controllers/ServiceFactory');

describe('ApplicationFactory', function() {
    'use strict';

    var createOptions = function() {
        var opts = Config.test();

        opts.logManager = MockLogger;

        return opts;
    };

    describe('#instance', function() {
        var factory = new ApplicationFactory( createOptions() ),
            methods = [
                'createServiceFactory',
                'startWebApplication',
                // inherited methods
                'createLogger',
                'createMiddlewareDelegate',
                'createCommonValidator',
                'addService',
                'findService',
                'getServices',
                'getConfiguration',
                'assignRoutes',
                'createRoutePath',
                'createWebServices',
                'initAppDefaults',
                'initMiddleware'
            ];

        it('should create an instance of ApplicationFactory', function() {
            should.exist( factory );

            factory.should.be.instanceof( ApplicationFactory );
        });

        it('should have all expected methods by size and type', function() {
            dash.methods( factory ).length.should.equal( methods.length );
            methods.forEach(function(method) {
                factory[ method ].should.be.a( 'function' );
            });
        });

    });

    describe('createServiceFactory', function() {
        var factory = new ApplicationFactory( createOptions() );

        it('should create a valid service factory', function() {
            var serviceFactory = factory.createServiceFactory();

            should.exist( serviceFactory );
            serviceFactory.should.be.instanceof( ServiceFactory );
        });
    });
});
