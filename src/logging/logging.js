const winston = require('winston');
const morgan = require('morgan');

const fileInfo = {
  level: 'info',
  filename: 'logs/info.log',
  json: false,
  format: winston.format.colorize(),
  handleExceptions: false
};
const fileError = {
  level: 'error',
  filename: 'logs/error.log',
  format: winston.format.uncolorize(),
  json: true,
  handleExceptions: true
};

const logger = new winston.createLogger({
  transports: [
    new winston.transports.File(fileInfo),
    new winston.transports.File(fileError)
  ],
  exitOnError: false
});
module.exports = {
  winston: logger,
  morgan
};
