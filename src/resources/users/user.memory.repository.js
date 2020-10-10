const DB = require('../../common/InMemoryDb');
const User = require('./user.model');
const getAll = async () => {
  return DB;
};
const get = async id => {
  const contact = DB.filter(c => c.id === id)[0];
  return contact;
};
const create = async user => {
  DB.push(user);
  return get(user.id);
};
const remove = async id => {
  const index = DB.indexOf(c => c.id === id);
  return DB.splice(index, 1);
};
const update = async (body, id) => {
  const contact = DB.filter(c => c.id === id)[0];
  const index = DB.indexOf(contact);
  const newUser = new User({
    id: body.id,
    login: body.login,
    password: body.password,
    name: body.name
  });
  DB.splice(index, 1, newUser);
  newUser.id = id;
  return newUser;
};
module.exports = { getAll, get, create, remove, update };
