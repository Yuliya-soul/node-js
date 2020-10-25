const mongoose = require('mongoose');
const uuid = require('uuid');

const taskSchema = new mongoose.Schema(
  {
    title: String,
    order: Number,
    description: String,
    userId: String,
    boardId: String,
    columnId: {
      type: Boolean,
      default: null
    },
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);
taskSchema.statics.toResponseTask = task => {
  const { id, title, order, description, userId, boardId, columnId } = task;
  return { id, title, order, description, userId, boardId, columnId };
};
const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
