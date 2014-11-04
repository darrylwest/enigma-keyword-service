/**
 * @class SessionDao
 *
 * @author: darryl.west@roundpeg.com
 * @created: 10/28/14 6:58 AM
 */
var dash = require('lodash'),
    AbstractBaseDao = require('node-service-commons').dao.AbstractBaseDao,
    crypto = require('crypto');

var SessionDao = function(options) {
    'use strict';

    var dao = this,
        log = options.log,
        domain = options.domain,
        pepper = options.pepper;

    AbstractBaseDao.extend( this, options );

    this.findByUserCode = function(client, code, callback) {
        log.info('find session by code: ', code);

        var keysCallback = function(err, keys) {
            if (err) {
                log.error( err );
                return callback( err );
            }

            var loopCallback = function(err, model) {
                if (err) {
                    log.error( err );
                    return callback( err );
                }

                if (model && model.userCode) {
                    var hcode = dao.createHash( model.userCode );

                    if (hcode === code) {
                        return callback( err, model );
                    }
                }

                var key = keys.pop();

                if (key) {
                    dao.findById( client, key, loopCallback );
                } else {
                    return callback( err );
                }
            };

            // start the keys loop
            loopCallback();
        };

        client.keys( dao.createDomainKey( '*' ), keysCallback );
    };

    this.createHash = function(code) {
        var hmac = crypto.createHmac( 'sha512', new Buffer( pepper ));

        hmac.update( code );

        return hmac.digest( 'hex' );
    };

    if (!pepper) throw new Error('session dao must be constructed with a pepper array');
};

SessionDao.DAO_NAME = 'SessionDao';

module.exports = SessionDao;
