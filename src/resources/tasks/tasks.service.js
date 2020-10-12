const TasksRepo = require('./tasks.memory.repository');

const getAllTasks = () => TasksRepo.getAllTasks();
const get = id => TasksRepo.get(id);
const getAll = boardId => TasksRepo.getAll(boardId);
const create = (boardId, newTask) => TasksRepo.create(boardId, newTask);
const getById = (boardId, id) => TasksRepo.getById(boardId, id);
const remove = (id, boardId) => TasksRepo.remove(id, boardId);
const update = (body, id, boardId) => TasksRepo.update(body, id, boardId);

module.exports = {
  getAllTasks,
  get,
  getAll,
  create,
  getById,
  update,
  remove
};
