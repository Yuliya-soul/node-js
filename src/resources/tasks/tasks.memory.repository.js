/* eslint-disable prettier/prettier */
const DB = require('../../common/InMemoryDb');
const Task = require('./tasks.model');

const getAllTasks = async () => {
  return DB.Tasks;
};
const getAll = async boardId => {
  const tasks = DB.Tasks.filter(c => c.boardId === boardId);
  if (tasks.length !== 0) {
    return tasks;
  }
};

const get = async id => {
    const task = DB.Tasks.filter(c => c.id === id)[0];
    return task;
};

const getById = async (id, boardId) => {
  const contact = DB.Tasks.filter(c => c.boardId === boardId && c.id === id)[0];
  const index = DB.Tasks.indexOf(contact);
  if (index !== -1) {
    return contact;
  }
};

const remove = async (id, boardId) => {
  const index = DB.Tasks.findIndex(
    task => task.id === id && task.boardId === boardId
  );
  if (index !== -1) {
    DB.Tasks = [...DB.Tasks.slice(0, index), ...DB.Tasks.slice(index + 1)];
    return {
      status: 200,
      result: 'The task has been deleted'
    };
  }
  return {
    status: 404,
    result: 'Task not found.'
  };
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
const update = async (body, id, boardId) => {
  const contact = DB.Tasks.filter(c => c.boardId === boardId && c.id === id)[0];
  if (contact) {
    contact.title = body.title;
    contact.description = body.description;
    contact.userId = body.userId;
    contact.boardId = body.boardId;
    return contact;
  }
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
