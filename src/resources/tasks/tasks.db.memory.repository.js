const Task = require('./task.db.model');

const getAll = async boardId => {
  const tasks = Task.find({ boardId }).exec();
  if (tasks.length !== 0) {
    return await tasks;
  }
};

const getById = async (id, boardId) => {
  return await Task.findOne({ _id: id, boardId }).exec();
};

const remove = async (id, boardId) => {
  const delTask = Task.findOneAndDelete({ _id: id, boardId });
  return await delTask;
};

const create = async (boardId, { title, order, description, userId }) => {
  return await Task.create({
    boardId,
    title,
    order,
    userId,
    description
  });
};
const update = async (body, id, boardId) => {
  const conditions = { _id: id, boardId };
  const update1 = {
    title: body.title,
    order: body.order,
    description: body.description,
    userId: body.userId
  };
  const updateTask = Task.findOneAndUpdate(conditions, update1);
  return await updateTask;
};

module.exports = {
  getAll,
  create,
  getById,
  remove,
  update
};
