/**
 * @class ServiceFactory
 *
 * @author: darryl.west@raincitysoftware.com
 * @created: 8/11/14 6:54 PM
 */
var should = require('chai').should(),
    dash = require('lodash' ),
    MockLogger = require('simple-node-logger').mocks.MockLogger,
    Config = require('../../app/controllers/Config'),
    ServiceFactory = require('../../app/controllers/ServiceFactory');

describe('ServiceFactory', function() {
    'use strict';

    var createOptions = function() {
        var opts = {};

        opts.createLogger = MockLogger.createLogger;
        opts.log = MockLogger.createLogger( 'ServiceFactory' );

        return opts;
    };

    describe('#instance', function() {
        var factory = new ServiceFactory( createOptions() ),
            methods = [
                'createDataSourceFactory',
                'createAccessWebService',
                'createAccessDataService',
                'createImageWebService',
                // dao
                'createAccessDao',
                // inherited
                'createIndexPageService',
                'createWebStatusService'
            ];

        it('should create an instance of ApplicationFactory', function() {
            should.exist( factory );

            factory.should.be.instanceof( ServiceFactory );
        });

        it('should have all expected methods by size and type', function() {
            dash.methods( factory ).length.should.equal( methods.length );
            methods.forEach(function(method) {
                // console.log( method );
                factory[ method ].should.be.a( 'function' );
            });
        });
    });
});

