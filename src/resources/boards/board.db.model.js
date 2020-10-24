const mongoose = require('mongoose');
const uuid = require('uuid');

const boardSchema = new mongoose.Schema(
  {
    title: String,
    order: Number,
    password: String,
    _id: {
      type: String,
      default: uuid
    },
    columns: {
      type: Array
    }
  },
  { versionKey: false }
);
boardSchema.statics.toResponseBoard = board => {
  const { id, title, columns, order } = board;
  return { id, title, columns, order };
};
const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
