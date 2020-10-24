const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('./config');
const User = require('../resources/users/user.db.model');
const Board = require('../resources/boards/board.db.model');

const users = [
  new User({ name: 'Kate', login: '123' }),
  new User({ name: 'Nike', login: '345' }),
  new User({ name: 'Zoi', login: '345' })
];
const boards = [
  new Board({ title: 'start program', order: 1 }),
  new Board({ title: 'check it', order: 2 }),
  new Board({ title: 'debag', order: 3 })
];
const connectToDB = cb => {
  mongoose.connect(`${MONGO_CONNECTION_STRING}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('were connected!');
    User.collection.drop();
    Board.collection.drop();
    users.forEach(user => user.save());
    boards.forEach(board => board.save());
    cb();
  });
};
module.exports = { connectToDB };
