/**
 * @class SessionDataset
 *
 * @author: darryl.west@roundpeg.com
 * @created: 10/28/14 7:02 AM
 */
var dash = require('lodash'),
    casual = require('casual' ),
    TestDataset = require('node-service-commons').fixtures.TestDataset,
    SessionDocument = require('../../app/models/SessionDocument');

var SessionDataset = function() {
    'use strict';

    var dataset = this;

    TestDataset.extend( this );

    // create a session document object
    this.createModel = function() {
        var model = new SessionDocument( dataset.createModelParams() );

        return model;
    };

    this.createModelParams = function() {
        var params = dataset.createBaseModelParams();

        params.userId = dataset.createModelId();
        params.challengeCode = dash.random(100000000, 9000000000).toString(19).replace('i', 'y');

        params.status = 'pending'; // active

        return params;
    };
};

module.exports = SessionDataset;