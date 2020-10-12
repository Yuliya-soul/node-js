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
const remove = async id => {
  const userIndex = DB.Users.findIndex(c => c.id === id);
  if (userIndex === -1) {
    return {
      status: 404,
      result: 'User not found.'
    };
  }
  DB.Tasks = DB.Tasks.map(t => {
    if (t.userId === id) {
      t.userId = null;
    }
    return t;
  });

  return {
    status: 204,
    result: 'The user has been deleted'
  };

  // DB.Users = DB.Users.filter(c => c.id !== id);
  // const task = DB.Tasks.filter(c => c.userId === id)[0];
  // const index = DB.Tasks.indexOf(task);
  // console.log(task, ', ', index);
  // if (index !== -1) {
  //   DB.Tasks[index].userId = null;
  // }
  // console.log(result);
  // return result;
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
  // const index = DB.Users.indexOf(contact);
  // const newUser = new User({
  //   id: body.id,
  //   login: body.login,
  //   password: body.password,
  //   name: body.name
  // });
  // DB.Users.splice(index, 1, newUser);
  // newUser.id = id;
};
module.exports = { getAll, get, create, remove, update };
