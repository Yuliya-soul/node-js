const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();
const getById = id => boardsRepo.getById(id);
const create = board => boardsRepo.create(board);
const remove = id => boardsRepo.remove(id);
const update = (body, id) => boardsRepo.update(body, id);

module.exports = { getAll, getById, create, remove, update };
