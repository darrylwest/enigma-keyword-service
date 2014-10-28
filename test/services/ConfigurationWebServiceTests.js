/**
 * @class ConfigurationWebServiceTests
 *
 * @author: darryl.west@roundpeg.com
 * @created: 10/27/14 4:41 PM
 */
var should = require('chai').should(),
    dash = require('lodash' ),
    MockServiceFactory = require('../mocks/MockServiceFactory' ),
    ConfigurationWebService = require('../../app/services/ConfigurationWebService');

describe('ConfigurationWebService', function() {
    'use strict';

    describe('#instance', function() {
        var service = MockServiceFactory.createInstance().createConfigurationWebService(),
            methods = [
                // inherited
                'query',
                'find',
                'save',
                'createFailedResponse',
                'createListPayload',
                'createModelPayload',
                'createSuccessResponse',
                'calculateDigest',
                'findIPAddress'
            ];

        it('should create an instance of ConfigurationWebService', function() {
            should.exist( service );
            service.should.be.instanceof( ConfigurationWebService );
        });

        it('should have all known methods by size and type', function() {
            dash.methods( service ).length.should.equal( methods.length );
            methods.forEach(function(method) {
                service[ method ].should.be.a( 'function' );
            });
        });
    });
});