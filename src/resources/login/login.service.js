const JWT_SECRET_KEY = require('../../common/config');
const { sign } = require('jsonwebtoken');

const createAccessToken = Login => {
  return sign({ Login }, `${JWT_SECRET_KEY}`, { expiresIn: '15m' });
};
module.exports = createAccessToken;
