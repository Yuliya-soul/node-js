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
BoardsDB.push(new Board(), new Board(), new Board());

module.exports = DB;
