/**
 * @class AccessDataServiceTests
 *
 * @author: darryl.west@raincitysoftware.com
 * @created: 8/12/14 3:27 PM
 */
var should = require('chai').should(),
    dash = require('lodash' ),
    Dataset = require('../fixtures/AccessDataset' ),
    MockServiceFactory = require('../mocks/MockServiceFactory' ),
    AccessDataService = require('../../app/services/AccessDataService' );

describe('AccessDataService', function() {
    'use strict';

    describe('#instance', function() {
        var service = MockServiceFactory.createInstance().createAccessDataService(),
            methods = [
                'query',
                'find',
                'save',
                'validate',
                // inherited
                'parseInt'
            ];

        it('should create an instance of AccessDataService', function() {
            should.exist( service );
            service.should.be.instanceof( AccessDataService );
        });

        it('should have all known methods by size and type', function() {
            dash.methods( service ).length.should.equal( methods.length );
            methods.forEach(function(method) {
                service[ method ].should.be.a( 'function' );
            });
        });
    });

    describe('save', function() {
        var service = MockServiceFactory.createInstance().createAccessDataService(),
            dataset = new Dataset();

        it('should save a new access document', function(done) {
            var ref = dataset.createModel();

            var callback = function(err, model) {
                should.not.exist( err );
                should.exist( model );

                done();
            };

            service.save( ref, callback );
        });

        it('should update an existing access document');
        it('should reject a non-valid document');
    });
});
