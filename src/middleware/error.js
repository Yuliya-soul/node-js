const { winston } = require('../logging/logging');

module.exports = (err, req, res) => {
  winston.error(err.message, { err });
  res.status(500).send('Something failed');
};
