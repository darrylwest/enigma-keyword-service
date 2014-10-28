/**
 * @class SessionWebServiceTests
 *
 * @author: darryl.west@roundpeg.com
 * @created: 10/28/14 7:52 AM
 */
var should = require('chai').should(),
    dash = require('lodash' ),
    MockServiceFactory = require('../mocks/MockServiceFactory' ),
    SessionWebService = require('../../app/services/SessionWebService');

describe('SessionWebService', function() {
    'use strict';

    describe('#instance', function() {
        var service = MockServiceFactory.createInstance().createSessionWebService(),
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

        it('should create an instance of SessionWebService', function() {
            should.exist( service );
            service.should.be.instanceof( SessionWebService );
        });

        it('should have all known methods by size and type', function() {
            dash.methods( service ).length.should.equal( methods.length );
            methods.forEach(function(method) {
                service[ method ].should.be.a( 'function' );
            });
        });
    });
});