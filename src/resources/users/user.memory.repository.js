const DB = require('../../common/InMemoryDb');
const User = require('./user.model');
const getAll = async () => {
  return DB.Users;
};
const get = async id => {
  const contact = DB.Users.filter(c => c.id === id)[0];
  return contact;
};
const create = async user => {
  DB.Users.push(user);
  return get(user.id);
};
const remove = async (boardId, id) => {
  DB.Users = DB.Users.filter(c => c.boardId !== boardId && c.id !== id);

  return DB.Users;
};
const update = async (body, id) => {
  const contact = DB.Users.filter(c => c.id === id)[0];
  const index = DB.Users.indexOf(contact);
  const newUser = new User({
    id: body.id,
    login: body.login,
    password: body.password,
    name: body.name
  });
  DB.Users.splice(index, 1, newUser);
  newUser.id = id;
  return newUser;
};
module.exports = { getAll, get, create, remove, update };
