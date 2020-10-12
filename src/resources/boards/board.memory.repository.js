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
const remove = async id => {
  const index = DB.Boards.findIndex(b => b.id === id);
  if (index !== -1) {
    DB.Boards = DB.Boards.filter(b => b.id === id);
    DB.Tasks = DB.Tasks.filter(t => t.boardId !== id);
    return {
      status: 204,
      result: 'The board has been deleted'
    };
  }

  return {
    status: 404,
    result: 'Board not found.'
  };
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
