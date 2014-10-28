/**
 * @class ConfigurationDataset
 *
 * @author: darryl.west@roundpeg.com
 * @created: 10/27/14 4:23 PM
 */

var dash = require('lodash'),
    casual = require('casual' ),
    TestDataset = require('node-service-commons').fixtures.TestDataset,
    ConfigurationDocument = require('../../app/models/ConfigurationDocument');

var ConfigurationDataset = function() {
    'use strict';

    var dataset = this;

    TestDataset.extend( this );

    // create a markup document object
    this.createModel = function() {
        var model = new ConfigurationDocument( dataset.createModelParams() );

        return model;
    };

    this.createModelParams = function() {
        var params = dataset.createBaseModelParams();

        params.id = 'test';
        params.navigation = {
            appTitle:'My Application',
            links:[
                { id:'home', label:'home' },
                { id:'about', label:'about' },
                { id:'logout', label:'logout' }
            ]
        };

        params.status = 'active';

        return params;
    };
};

module.exports = ConfigurationDataset;