/**
 * @class ConfigurationDocument
 *
 * @author: darryl.west@roundpeg.com
 * @created: 10/27/14 5:09 PM
 */
var AbstractBaseModel = require('node-service-commons' ).models.AbstractBaseModel,
    dash = require('lodash');

var ConfigurationDocument = function(params) {
    'use strict';

    if (!params) params = {};

    AbstractBaseModel.extend( this, params );

    this.navigation = params.navigation;
    this.env = params.env;
    this.status = params.status;
};

module.exports = ConfigurationDocument;
