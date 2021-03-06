const boardsRepo = require('./board.db.memory.repository');
const tasksRepo = require('../tasks/tasks.db.memory.repository');

const getAll = () => boardsRepo.getAll();
const getById = id => boardsRepo.getById(id);
const create = board => boardsRepo.create(board);
const remove = id => boardsRepo.remove(id);
const update = (body, id) => boardsRepo.update(body, id);
const removeBoardTasks = boardId => tasksRepo.removeAllBoardTasks(boardId);
module.exports = { getAll, getById, create, remove, update, removeBoardTasks };
