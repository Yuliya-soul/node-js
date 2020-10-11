const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');
const User = require('../resources/users/user.model');
const DB = {
  Users: [],
  Boards: [],
  Tasks: []
};
const UsersDB = DB.Users;
const BoardsDB = DB.Boards;
const TasksDB = DB.Tasks;
const user1 = new User({ name: 'Kate', login: '123' });
const user2 = new User({ name: 'Nike', login: '345' });
UsersDB.push(user1, user2, new User({ name: 'Mike', login: '678' }));

const board1 = new Board({ title: 'start program', order: 1 });
const board2 = new Board({ title: 'check it', order: 2 });
BoardsDB.push(board1, board2, new Board({ title: 'debag', order: 3 }));
TasksDB.push(
  new Task({
    boardId: board1.id,
    title: board1.title,
    order: board1.order,
    userId: user1.id
  }),
  new Task({
    boardId: board2.id,
    title: board2.title,
    order: board2.order,
    userId: user2.id
  }),
  new Task({
    boardId: board2.id,
    title: board2.title,
    order: board2.order,
    userId: user2.id
  })
);

module.exports = DB;
