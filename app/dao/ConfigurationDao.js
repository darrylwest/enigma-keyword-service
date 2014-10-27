/**
 * @class ConfigurationDao
 *
 * @author: darryl.west@roundpeg.com
 * @created: 10/27/14 3:54 PM
 */
var dash = require('lodash'),
    AbstractBaseDao = require('node-service-commons').dao.AbstractBaseDao;

var ConfigurationDao = function(options) {
    'use strict';

    var dao = this,
        log = options.log,
        domain = options.domain;

    AbstractBaseDao.extend( this, options );

    // TODO override query, findById, insert and update with concrete methods
};

ConfigurationDao.DAO_NAME = 'ConfigurationDao';

module.exports = ConfigurationDao;
