const Board = require('../resources/boards/board.model');
const User = require('../resources/users/user.model');
const DB = {
  Users: [],
  Boards: [],
  Tasks: []
};
const UsersDB = DB.Users;
const BoardsDB = DB.Boards;
UsersDB.push(
  new User({ name: 'Kate', login: '123' }),
  new User({ name: 'Nike', login: '345' }),
  new User({ name: 'Mike', login: '678' })
);
BoardsDB.push(
  new Board({ title: 'start program', order: 1 }),
  new Board({ title: 'check it', order: 2 }),
  new Board({ title: 'debag', order: 3 })
);

module.exports = DB;
