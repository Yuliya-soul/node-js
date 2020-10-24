const User = require('./user.db.model');

const getAll = async () => {
  return await User.find({});
};
const get = async id => {
  return await User.findOne({ _id: id });
};
const create = async user => {
  return await User.create(user);
};
/* const unassignedUserTasks = async userId => {
  throw new Error();
  /*   DB.Tasks = DB.Tasks.map(task => {
    if (task.userId === userId) {
      task.userId = null;
    }
    return task;
  }); */

const remove = async id => {
  const delUser = User.findOneAndDelete({ _id: id });
  return await delUser;
};
const update = async (body, id) => {
  const updateUser = User.findByIdAndUpdate(
    { _id: id },
    { name: body.name, login: body.login, password: body.password }
  );
  return await updateUser;
};
module.exports = { getAll, get, create, remove, update };
