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

/* const removeAllBoardTasks = async boardId => {
  throw new Error();
  /* DB.Tasks = DB.Tasks.filter(task => task.boardId !== boardId); */
const remove = async id => {
  const delBoard = Board.findOneAndDelete({ _id: id });
  return await delBoard;
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
