const User = require('../resources/users/user.model');

const DB = [];
DB.push(
  new User({ name: 'Kate', login: '123' }),
  new User({ name: 'Nike', login: '345' }),
  new User({ name: 'Mike', login: '678' })
);
module.exports = DB;
