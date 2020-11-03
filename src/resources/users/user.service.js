const TasksRepo = require('../tasks/tasks.router');
const usersRepo = require('./user.db.memory.repository');

const getAll = () => usersRepo.getAll();
const get = id => usersRepo.get(id);
const create = user => usersRepo.create(user);
const remove = id => usersRepo.remove(id);
const update = (body, id) => usersRepo.update(body, id);
const postLogin = (login, password) => usersRepo.postLogin(login, password);
const unassignedUserTasks = userId => TasksRepo.unassignedUserTasks(userId);

module.exports = {
  getAll,
  get,
  create,
  remove,
  update,
  unassignedUserTasks,
  postLogin
};
