
var Manager = require('simple-node-logger'),
    conf = {
      logDirectory: process.env.HOME + '/logs',
      fileNamePattern: 'markup-service-<date>.log',
      dateFormat: 'YYYY.MM.DD'
    },
    manager = new Manager( conf );

manager.createRollingFileAppender( conf );
manager.createConsoleAppender();

exports.createLogger = function(category, level) {
    return manager.createLogger( category, level );
};

exports.VERSION = '00.90.113';
