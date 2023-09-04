/*Configurations of logger*/
var winston = require('winston');
const {createLogger,transports} = require('winston');
require('winston-daily-rotate-file');


var transport = new transports.DailyRotateFile({
  filename: 'storage/log/msg.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d'
});

transport.on('rotate', function(oldFilename, newFilename) {
  // do something fun
});

const logger = createLogger({
  transports: [
    transport
  ]
});
module.exports = {
  'logMsg': logger,
};
