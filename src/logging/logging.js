const winston = require('winston');
const morgan = require('morgan');
require('express-async-errors');

const fileInfo = {
  level: 'info',
  filename: 'logs/info.log',
  json: false,
  colorize: false,
  timestamp: true,
  handleExceptions: false
};
const fileError = {
  level: 'error',
  filename: 'logs/error.log',
  colorize: false,
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
morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    decodeURIComponent(tokens.url(req, res)),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'),
    '-',
    tokens['response-time'](req, res),
    'ms'
  ].join(' ');
});
module.exports = {
  winston: logger,
  morgan
};
