/**
 * @class MarkupDataset
 *
 * @author: darryl.west@raincitysoftware.com
 * @created: 9/4/14 10:30 AM
 */
var dash = require('lodash'),
    casual = require('casual' ),
    TestDataset = require('node-service-commons').fixtures.TestDataset,
    AccessDocument = require('../../app/models/AccessDocument');

var AccessDataset = function() {
    'use strict';

    var dataset = this;

    TestDataset.extend( this );

    // create a markup document object
    this.createModel = function() {
        return new AccessDocument( dataset.createModelParams() );
    };

    this.createModelParams = function() {
        var params = dataset.createBaseModelParams();

        params.status = 'active';

        return params;
    };
};

module.exports = AccessDataset;
