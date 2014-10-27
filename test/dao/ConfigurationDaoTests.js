/**
 * @class ConfigurationDaoTests
 *
 * @author: darryl.west@roundpeg.com
 * @created: 10/27/14 3:56 PM
 */
var should = require('chai').should(),
    dash = require('lodash' ),
    Dataset = require('../fixtures/AccessDataset' ),
    MockServiceFactory = require('../mocks/MockServiceFactory' ),
    ConfigurationDao = require('../../app/dao/ConfigurationDao');

describe('ConfigurationDao', function() {
    'use strict';

    var dataset = new Dataset();

    describe('#instance', function() {
        var dao = MockServiceFactory.createInstance().createConfigurationDao(),
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

        it('should create an instance of ConfigurationDao', function() {
            should.exist( dao );
            dao.should.be.instanceof( ConfigurationDao );
        });

        it('should have all known methods by size and type', function() {
            dash.methods( dao ).length.should.equal( methods.length );
            methods.forEach(function(method) {
                dao[ method ].should.be.a( 'function' );
            });
        });
    });
});
