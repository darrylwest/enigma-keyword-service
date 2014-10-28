/**
 * @class SessionDaoTests
 *
 * @author: darryl.west@roundpeg.com
 * @created: 10/28/14 7:00 AM
 */
var should = require('chai').should(),
    dash = require('lodash' ),
    Dataset = require('../fixtures/SessionDataset' ),
    MockServiceFactory = require('../mocks/MockServiceFactory' ),
    SessionDao = require('../../app/dao/SessionDao');

describe('SessionDao', function() {
    'use strict';

    var dataset = new Dataset();

    describe('#instance', function() {
        var dao = MockServiceFactory.createInstance().createSessionDao(),
            methods = [
                // inherited
                'createModelId',
                'createDomainKey',
                'query',
                'findById',
                'insert',
                'update',
                'parseModel'
            ];

        it('should create an instance of SessionDao', function() {
            should.exist( dao );
            dao.should.be.instanceof( SessionDao );
        });

        it('should have all known methods by size and type', function() {
            dash.methods( dao ).length.should.equal( methods.length );
            methods.forEach(function(method) {
                dao[ method ].should.be.a( 'function' );
            });
        });
    });
});
