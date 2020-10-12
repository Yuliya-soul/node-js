const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();
const get = id => usersRepo.get(id);
const create = user => usersRepo.create(user);
const remove = (id, boardId) => usersRepo.remove(id, boardId);
const update = (body, id) => usersRepo.update(body, id);

module.exports = { getAll, get, create, remove, update };
