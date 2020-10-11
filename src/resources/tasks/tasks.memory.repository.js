const DB = require('../../common/InMemoryDb');

const getAllTasks = async () => {
  return DB.Tasks;
};

module.exports = { getAllTasks };
