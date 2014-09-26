/**
 * @class AccessDaoTests
 *
 * @author: darryl.west@raincitysoftware.com
 * @created: 9/2/14
 */
var should = require('chai').should(),
    dash = require('lodash' ),
    Dataset = require('../fixtures/AccessDataset' ),
    MockServiceFactory = require('../mocks/MockServiceFactory' ),
    AccessDao = require('../../app/dao/AccessDao');

describe('AccessDao', function() {
    'use strict';

    var dataset = new Dataset();

    describe('#instance', function() {
        var dao = MockServiceFactory.createInstance().createAccessDao(),
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

        it('should create an instance of AccessDao', function() {
            should.exist( dao );
            dao.should.be.instanceof( AccessDao );
        });

        it('should have all known methods by size and type', function() {
            dash.methods( dao ).length.should.equal( methods.length );
            methods.forEach(function(method) {
                dao[ method ].should.be.a( 'function' );
            });
        });
    });
});
