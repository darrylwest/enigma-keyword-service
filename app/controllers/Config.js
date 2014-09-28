/**
 * @class Config
 *
 * @author: darryl.west@raincitysoftware.com
 * @created: 8/11/14 5:19 PM
 */
var VERSION = require( __dirname + '/../../package.json').version;

var externalConfig;

/**
 * @param options
 * @constructor
 */
var Config = function(options) {
    "use strict";

    if (!options) options = {};

    this.version = VERSION;

    if (options.configfile) {
        externalConfig = require( options.configfile );
    } else {
        externalConfig = require( '../../config.json' );
    }

    // set the command line arg/defaults
    this.environment = options.env;

    this.appkey = 'f804069e-472c-11e4-8207-0b0c205e8f2a';
    this.includeXAPIKey = true;

    this.apptitle = 'Enigma Service';
    this.copyright = 'Copyright (c) 2014, Rain City Software';

    this.baseURI = '/EnigmaService';
    this.port = 15061;

    this.messageServiceURL = 'http://localhost:29163/enigma';
};

Config.development = function(opts) {
    "use strict";

    if (!opts) opts = {};
    opts.env = 'development';

    var config = new Config( opts );
    config.includeXAPIKey = false;

    return config;
};

Config.test = function(opts) {
    "use strict";

    if (!opts) opts = {};
    opts.env = 'test';

    var config = new Config( opts );

    return config;
};

Config.production = function(opts) {
    "use strict";

    if (!opts) opts = {};
    opts.env = 'production';
    var config = new Config( opts );

    return config;
};

Config.VERSION = VERSION;

module.exports = Config;
