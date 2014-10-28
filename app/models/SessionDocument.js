/**
 * @class SessionDocument
 *
 * @author: darryl.west@roundpeg.com
 * @created: 10/28/14 7:38 AM
 */
var AbstractBaseModel = require('node-service-commons' ).models.AbstractBaseModel,
    dash = require('lodash');

var SessionDocument = function(params) {
    'use strict';

    if (!params) params = {};

    AbstractBaseModel.extend( this, params );

    this.userId = params.userId;
    this.challengeCode = params.challengeCode;

    this.status = params.status;
};

module.exports = SessionDocument;
