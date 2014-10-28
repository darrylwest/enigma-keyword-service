/**
 * @class SessionDataServiceTests
 *
 * @author: darryl.west@roundpeg.com
 * @created: 10/28/14 7:32 AM
 */
var should = require('chai').should(),
    dash = require('lodash' ),
    Dataset = require('../fixtures/ConfigurationDataset' ),
    MockServiceFactory = require('../mocks/MockServiceFactory' ),
    SessionDataService = require('../../app/services/SessionDataService' ),
    SessionDocument = require('../../app/models/SessionDocument');

describe('SessionDataService', function() {
    'use strict';

    describe('#instance', function() {
        var service = MockServiceFactory.createInstance().createSessionDataService(),
            methods = [
                'query',
                'find',
                'save',
                'validate',
                'createChallengeCode',
                // inherited
                'parseInt'
            ];

        it('should create an instance of SessionDataService', function() {
            should.exist( service );
            service.should.be.instanceof( SessionDataService );
        });

        it('should have all known methods by size and type', function() {
            dash.methods( service ).length.should.equal( methods.length );
            methods.forEach(function(method) {
                service[ method ].should.be.a( 'function' );
            });
        });
    });

    describe('save', function() {
        var service = MockServiceFactory.createInstance().createSessionDataService(),
            dataset = new Dataset();

        it('should save a new session document', function(done) {
            var ref = {
                userCode:'ifkdl344',
                status:'request'
            };

            var callback = function(err, model) {
                should.not.exist( err );
                should.exist( model );

                should.exist( model.id );
                should.exist( model.status );

                done();
            };

            service.save( ref, callback );
        });

        it('should update an existing session document', function(done) {
            var ref = dataset.createModel();

            ref.dateCreated = ref.lastUpdated = new Date( Date.now() - 60000 );

            var callback = function(err, model) {
                should.not.exist( err );
                should.exist( model );

                // console.log( model );

                done();
            };

            service.save( ref, callback );
        });

        it('should reject a non-valid document', function() {
            var model = dataset.createModel(),
                errors = service.validate( model );

            errors.length.should.equal( 0 );

            model.status = null;
            errors = service.validate( model );

            errors.length.should.equal( 1 );
        });

        it('should create a unique challenge code', function() {
            var code = service.createChallengeCode();

            should.exist( code );
        });
    });
});
