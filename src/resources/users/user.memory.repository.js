const DB = require('../../common/InMemoryDb');
const User = require('./user.model');
const getAll = async () => {
  return DB.Users;
};
const get = async id => {
  const contact = DB.Users.find(c => c.id === id);
  return contact;
};
const create = async user => {
  DB.Users.push(user);
  return get(user.id);
};
const unassignedUserTasks = async userId => {
  DB.Tasks = DB.Tasks.map(task => {
    if (task.userId === userId) {
      task.userId = null;
    }
    return task;
  });
};
const remove = async id => {
  const result = DB.Users.find(c => c.id === id);
  if (result) {
    DB.Users = DB.Users.filter(c => c.id !== id);
    unassignedUserTasks(id);
    return result;
  }
  return result === null;
};
const update = async (body, id) => {
  const index = DB.Users.findIndex(c => c.id === id);
  if (index !== -1) {
    DB.Users[index] = new User({
      id,
      login: body.login,
      password: body.password,
      name: body.name
    });
    return DB.Users[index];
  }
  return null;
};
module.exports = { getAll, get, create, remove, update };
