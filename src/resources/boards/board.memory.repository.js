const DB = require('../../common/InMemoryDb');
const Board = require('./board.model');

const getAll = async () => {
  return DB.Boards;
};
const getById = async id => {
  const index = DB.Boards.findIndex(c => c.id === id);
  if (index !== -1) {
    return DB.Boards[index];
  }
  return null;
};
const create = async board => {
  DB.Boards.push(board);
  return getById(board.id);
};

const removeAllBoardTasks = async boardId => {
  DB.Tasks = DB.Tasks.filter(task => task.boardId !== boardId);
};
const remove = async id => {
  const result = DB.Boards.find(c => c.id === id);
  const result1 = DB.Tasks.find(c => c.boardId === id);
  if (result) {
    if (result1) {
      removeAllBoardTasks(id);
    }
    DB.Boards = DB.Boards.filter(c => c.id !== id);
    return result;
  }
  return result === null;
};
const update = async (body, id) => {
  const board = DB.Boards.filter(c => c.id === id)[0];
  const index = DB.Boards.indexOf(board);
  const newBoard = new Board({
    title: body.title,
    id: body.id,
    columns: body.columns
  });
  DB.Boards.splice(index, 1, newBoard);
  newBoard.id = id;
  return newBoard;
};

module.exports = { getAll, getById, create, remove, update };
