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
    ConfigurationDataService = require('../../app/services/ConfigurationDataService' ),
    ConfigurationDocument = require('../../app/models/ConfigurationDocument');

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

        it('should save a new configuration document', function(done) {
            var ref = dataset.createModel();

            ref.dateCreated = ref.lastUpdated = null;

            var callback = function(err, model) {
                should.not.exist( err );
                should.exist( model );

                should.exist( model.dateCreated );
                should.exist( model.lastUpdated );

                done();
            };

            service.save( ref, callback );
        });

        it('should update an existing configuration document', function(done) {
            var ref = dataset.createModel();

            ref.navigation.appTitle = 'My New Title';
            ref.dateCreated = ref.lastUpdated = new Date( Date.now() - ( 60 * 1000 ) );

            var callback = function(err, model) {
                should.not.exist( err );
                should.exist( model );

                console.log( model );

                model.dateCreated.getTime().should.be.below( model.lastUpdated.getTime() );

                done();
            };

            service.save( ref, callback );
        });

        it('should reject a non-valid document', function() {
            var model = dataset.createModel(),
                errors = service.validate( model );

            errors.length.should.equal( 0 );

            model.navigation = null;
            errors = service.validate( model );

            errors.length.should.equal( 1 );
        });
    });
});
