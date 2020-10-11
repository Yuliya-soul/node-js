const TasksRepo = require('./tasks.memory.repository');

const getAllTasks = () => TasksRepo.getAllTasks();
const get = id => TasksRepo.get(id);
const getAll = boardId => TasksRepo.getAll(boardId);
const create = (boardId, newTask) => TasksRepo.create(boardId, newTask);

module.exports = { getAllTasks, get, getAll, create };
