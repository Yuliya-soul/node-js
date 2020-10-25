const Task = require('../tasks/task.db.model');
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

const remove = async id => {
  const delUser = await User.findOneAndDelete({ _id: id });
  const query = { userId: id };
  const delUserTask = await Task.updateMany(query, { userId: null });

  return { delUser, delUserTask };
};
const update = async (body, id) => {
  const updateUser = User.findByIdAndUpdate(
    { _id: id },
    { name: body.name, login: body.login, password: body.password }
  );
  return await updateUser;
};
module.exports = { getAll, get, create, remove, update };
