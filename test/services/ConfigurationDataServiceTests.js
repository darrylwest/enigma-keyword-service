/**
 *
 *
 * @author: darryl.west@roundpeg.com
 * @created: 10/27/14 4:30 PM
 */
var should = require('chai').should(),
    dash = require('lodash' ),
    Dataset = require('../fixtures/ConfigurationDataset' ),
    MockServiceFactory = require('../mocks/MockServiceFactory' ),
    ConfigurationDataService = require('../../app/services/ConfigurationDataService' );

describe('ConfigurationDataService', function() {
    'use strict';

    describe('#instance', function() {
        var service = MockServiceFactory.createInstance().createConfigurationDataService(),
            methods = [
                'query',
                'find',
                'save',
                'validate',
                // inherited
                'parseInt'
            ];

        it('should create an instance of ConfigurationDataService', function() {
            should.exist( service );
            service.should.be.instanceof( ConfigurationDataService );
        });

        it('should have all known methods by size and type', function() {
            dash.methods( service ).length.should.equal( methods.length );
            methods.forEach(function(method) {
                service[ method ].should.be.a( 'function' );
            });
        });
    });

    describe('save', function() {
        var service = MockServiceFactory.createInstance().createConfigurationDataService(),
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

        it('should update an existing configuration document');
        it('should reject a non-valid document');
    });
});
