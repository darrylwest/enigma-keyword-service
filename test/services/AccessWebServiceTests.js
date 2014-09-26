/**
 * @class AccessWebServiceTests
 *
 * @author: darryl.west@raincitysoftware.com
 * @created: 8/12/14 7:55 PM
 */
var should = require('chai').should(),
    dash = require('lodash' ),
    MockServiceFactory = require('../mocks/MockServiceFactory' ),
    AccessWebService = require('../../app/services/AccessWebService');

describe('AccessWebService', function() {
    'use strict';

    describe('#instance', function() {
        var service = MockServiceFactory.createInstance().createAccessWebService(),
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

        it('should create an instance of AccessWebService', function() {
            should.exist( service );
            service.should.be.instanceof( AccessWebService );
        });

        it('should have all known methods by size and type', function() {
            dash.methods( service ).length.should.equal( methods.length );
            methods.forEach(function(method) {
                service[ method ].should.be.a( 'function' );
            });
        });
    });
});
