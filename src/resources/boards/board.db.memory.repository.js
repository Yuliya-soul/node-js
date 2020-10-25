const Task = require('../tasks/task.db.model');
const Board = require('./board.db.model');

const getAll = async () => {
  return await Board.find({});
};
const getById = async id => {
  return await Board.findOne({ _id: id });
};
const create = async board => {
  return await Board.create(board);
};

const remove = async id => {
  const delBoard = await Board.findOneAndDelete({ _id: id });
  const delTasks = await Task.deleteMany({ boardId: id });
  return { delBoard, delTasks };
};
const update = async (body, id) => {
  const updateBoard = Board.findByIdAndUpdate(
    { _id: id },
    { ...body },
    { new: true }
  );
  return await updateBoard;
};

module.exports = { getAll, getById, create, remove, update };
