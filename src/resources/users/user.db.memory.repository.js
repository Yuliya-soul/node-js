const Task = require('../tasks/task.db.model');
const User = require('./user.db.model');

const { compare } = require('bcrypt');
const createAccessToken = require('../login/login.service');

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
    { name: body.name, login: body.login, password: body.password },
    { new: true }
  );
  return await updateUser;
};

const postLogin = async (login, password) => {
  const alreadyExistUser = await User.findOne({ login });
  if (!alreadyExistUser) {
    return {
      status: 403,
      result: 'Access denied'
    };
  }

  const check1 = await new Promise((res, rej) => {
    compare(password, alreadyExistUser.password, (err, data) => {
      if (err) return rej(err);
      return res(data);
    });
  });

  if (check1) {
    const accessToken = createAccessToken(login);
    return {
      status: 200,
      result: { accessToken }
    };
  }
  return {
    status: 400,
    result: 'Check password.'
  };
};

module.exports = { getAll, get, create, remove, update, postLogin };
