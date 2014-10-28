/**
 * @class SessionDao
 *
 * @author: darryl.west@roundpeg.com
 * @created: 10/28/14 6:58 AM
 */
var dash = require('lodash'),
    AbstractBaseDao = require('node-service-commons').dao.AbstractBaseDao;

var SessionDao = function(options) {
    'use strict';

    var dao = this,
        log = options.log,
        domain = options.domain;

    AbstractBaseDao.extend( this, options );

    // TODO override query, findById, insert and update with concrete methods
};

SessionDao.DAO_NAME = 'SessionDao';

module.exports = SessionDao;
