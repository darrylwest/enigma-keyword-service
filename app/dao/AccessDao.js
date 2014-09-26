/**
 * @class AccessDao
 *
 * @author: darryl.west@raincitysoftware.com
 * @created: 9/2/14
 */
var dash = require('lodash'),
    AbstractBaseDao = require('node-service-commons').dao.AbstractBaseDao;

var AccessDao = function(options) {
    'use strict';

    var dao = this,
        log = options.log,
        domain = options.domain;

    AbstractBaseDao.extend( this, options );

    // TODO override query, findById, insert and update with concrete methods
};

AccessDao.DAO_NAME = 'AccessDao';

module.exports = AccessDao;
