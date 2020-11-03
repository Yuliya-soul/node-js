const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('./config');
const User = require('../resources/users/user.db.model');
const Board = require('../resources/boards/board.db.model');
const Task = require('../resources/tasks/task.db.model');
const { hashSync } = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0//P4$$w0rD';
const adminPassword = 'admin';
const hash3 = hashSync(adminPassword, saltRounds);

const hash1 = hashSync(myPlaintextPassword, saltRounds);
const hash2 = hashSync(myPlaintextPassword, saltRounds);

const user1 = new User({
  name: 'Kate',
  login: '123',
  password: hash1
});
const user2 = new User({ name: 'Nike', login: '345', password: hash2 });
const user3 = new User({ name: 'admin', login: 'admin', password: hash3 });
const board1 = new Board({ title: 'start program', order: 1 });
const board2 = new Board({ title: 'check it', order: 2 });
const board3 = new Board({ title: 'done', order: 2 });
const task1 = new Task({
  boardId: board1.id,
  title: board1.title,
  order: board1.order,
  userId: user1.id
});
const task2 = new Task({
  boardId: board2.id,
  title: board2.title,
  order: board2.order,
  userId: user2.id
});
const task3 = new Task({
  boardId: board2.id,
  title: board2.title,
  order: board2.order,
  userId: user2.id
});
const users = [user1, user2, user3];
const boards = [board1, board2, board3];
const tasks = [task1, task2, task3];

const connectToDB = cb => {
  mongoose.connect(`${MONGO_CONNECTION_STRING}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('were connected!');
    User.collection.drop();
    Board.collection.drop();
    Task.collection.drop();
    users.forEach(user => user.save());
    boards.forEach(board => board.save());
    tasks.forEach(task => task.save());
    cb();
  });
};
module.exports = { connectToDB, hash3 };
