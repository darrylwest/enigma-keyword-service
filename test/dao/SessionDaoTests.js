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
                'findByUserCode',
                'createHash',
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

    describe('createHash', function() {
        var dao = MockServiceFactory.createInstance().createSessionDao();

        it('should create a known hash code', function() {
            var code = '123456789',
                hcode = dao.createHash( code );

            // console.log( hcode );
            hcode.should.equal( 'd227828a4af115fcf7af21cd73d3642509525a2ebe0e1aad73d5a161f193176aff185912707bb2d92e629cfbe57682146705a0cd2bea9414106c2d6c3e6fb5a8' );
        });
    });
});
