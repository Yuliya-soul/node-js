const DB = require('../../common/InMemoryDb');
const Task = require('./task.model');

const getAllTasks = async () => {
  return DB.Tasks;
};
const get = async id => {
  const task = DB.Tasks.filter(c => c.id === id)[0];
  return task;
};

const getAll = async boardId => {
  const tasks = DB.Tasks.filter(c => c.boardId === boardId);
  return tasks;
};

const create = async (
  boardId,
  { title, order, description, userId, columnId }
) => {
  const task = new Task({
    title,
    order,
    description,
    userId,
    boardId,
    columnId
  });
  DB.Tasks = [...DB.Tasks, task];

  return task;
};

module.exports = { getAllTasks, get, getAll, create };
