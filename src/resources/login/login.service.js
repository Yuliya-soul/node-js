const usersRepo = require('../users/user.db.memory.repository');

const create = user => usersRepo.create(user);

module.exports = { create };
