const DB = require('../../common/InMemoryDb');
const Task = require('./task.model');

const getAllTasks = async () => {
  return DB.Tasks;
};
const get = async id => {
  const task = DB.Tasks.filter(c => c.id === id)[0];
  return task;
};

const getById = async (boardId, id) => {
  const getTask = DB.Tasks.find(
    task => task.id === id && task.boardId === boardId
  )[0];
  if (typeof getTask === 'undefined') {
    return {
      status: 404,
      result: 'Task not found'
    };
  }
  return {
    status: 200,
    result: Task.toResponse(getTask)
  };
};

const getAll = async boardId => {
  const tasks = DB.Tasks.filter(c => c.boardId === boardId);
  if (tasks.length !== 0) {
    return tasks;
  }
};
const remove = async (id, boardId) => {
  // const contact = DB.Tasks.filter(c => c.boardId === boardId);
  // const contact1 = contact.filter(c => c.id === id);
  // const index = DB.Tasks.indexOf(contact1[0]);
  DB.Tasks = DB.Tasks.filter(c => c.boardId !== boardId && c.id !== id);

  return DB.Tasks;
};

const create = async (
  boardId,
  { title, order, description, userId, columnId = null }
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
const update = async ({ body, id, boardId }) => {
  const contact = DB.Tasks.filter(c => c.boardId === boardId)[0];
  const contact1 = contact.filter(c => c.id === id)[0];
  const index = DB.Tasks.indexOf(contact1);
  const newTask = new Task({
    id: body.id,
    title: body.title,
    description: body.description,
    userId: body.userId,
    boardId: body.boardId
  });
  DB.Tasks.splice(index, 1, newTask);
  newTask.id = id;
  return newTask;
};

module.exports = {
  getAllTasks,
  get,
  getAll,
  create,
  getById,
  remove,
  update
};
