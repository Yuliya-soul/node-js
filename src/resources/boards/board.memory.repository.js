const DB = require('../../common/InMemoryDb');
const Board = require('./board.model');

const getAll = async () => {
  return DB.Boards;
};
const get = async id => {
  const board = DB.Boards.filter(c => c.id === id)[0];
  return board;
};
const create = async board => {
  DB.Boards.push(board);
  return get(board.id);
};
const remove = async id => {
  const index = DB.Boards.findIndex(board => board.id === id);
  if (index !== -1) {
    DB.Boards = [...DB.Boards.slice(0, index), ...DB.Boards.slice(index + 1)];
    return {
      status: 204,
      result: 'The board has been deleted'
    };
  }
  return {
    status: 404,
    result: 'Board not found.'
  };
  // const contact = DB.Boards.filter(c => c.id === id);
  // const index = DB.Boards.indexOf(contact[0]);
  // if (index !== -1) {
  //   return DB.Boards.splice(index, 1);
  // }
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

module.exports = { getAll, get, create, remove, update };
