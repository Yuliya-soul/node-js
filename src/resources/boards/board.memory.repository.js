const DB = require('../../common/InMemoryDb');

const getAll = async () => {
  return DB.Boards;
};
module.exports = { getAll };
