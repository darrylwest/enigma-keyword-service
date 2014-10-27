/**
 * @class ConfigurationDataset
 *
 * @author: darryl.west@roundpeg.com
 * @created: 10/27/14 4:23 PM
 */

var dash = require('lodash'),
    casual = require('casual' ),
    TestDataset = require('node-service-commons').fixtures.TestDataset;

var ConfigurationDataset = function() {
    'use strict';

    var dataset = this;

    TestDataset.extend( this );

    // create a markup document object
    this.createModel = function() {
        var model = dataset.createModelParams() ;

        return model;
    };

    this.createModelParams = function() {
        var params = dataset.createBaseModelParams();

        params.id = 'test';

        return params;
    };
};

module.exports = ConfigurationDataset;