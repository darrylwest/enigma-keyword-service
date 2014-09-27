/**
 * @class MarkupDocument
 * @classdesc container for shapes, comments, docid (image), etc.
 *
 * @author: darryl.west@raincitysoftware.com
 * @created: 9/5/14 1:02 PM
 */
var AbstractBaseModel = require('node-service-commons' ).models.AbstractBaseModel,
    dash = require('lodash');

var AccessDocument = function(params) {
    'use strict';

    if (!params) params = {};

    AbstractBaseModel.extend( this, params );

    this.topic = params.topic;
    this.title = params.title;
    this.content = params.content;

    this.encryption = params.encryption; // none, blowfish, aes, etc

    this.status = params.status;
};

module.exports = AccessDocument;
