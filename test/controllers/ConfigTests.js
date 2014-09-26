/**
 * @class ConfigTests
 *
 * @author: darryl.west@raincitysoftware.com
 * @created: 8/11/14 5:19 PM
 */
var should = require('chai').should(),
    Config = require('../../app/controllers/Config');

describe( 'Config', function() {
    'use strict';

    var port = 15061;

    describe( '#instance', function() {
        it( 'should be instance of Config', function() {
            var opts = {
                env:'test',
                data:'./data'
            };
            var config = new Config( opts );

            should.exist( config );
            config.should.be.instanceof( Config );

            // test for the standard properties
            var props = [
                'version',
                'environment',
                'apptitle',
                'copyright',
                'baseURI',
                'port'
            ];

            props.forEach(function( prop ) {
                config.should.have.property( prop );
                should.exist( config[ prop ] );
            });

        });
    });

    describe( 'statics', function() {
        it( 'should have static constructor methods', function() {
            var statics = [ 'development', 'test', 'production' ];
            statics.forEach(function( env ) {
                Config[ env ].should.be.a('function');
            });
        });
    });

    describe( 'development', function() {
        it( 'should be configured for development', function() {
            var opts = {};

            var config = Config.development( opts );

            should.exist( config );
            config.environment.should.equal( 'development' );

            config.port.should.equal( port );
        });
    });

    describe( 'test', function() {
        it( 'should be configured for test', function() {
            var opts = {};

            var config = Config.test( opts );

            should.exist( config );
            config.environment.should.equal( 'test' );
            config.port.should.equal( port );
        });
    });

    describe( 'production', function() {
        it( 'should be configured for production', function() {
            var opts = {};

            var config = Config.production( opts );

            should.exist( config );
            config.environment.should.equal( 'production' );
            config.port.should.equal( port );
        });
    });
});

