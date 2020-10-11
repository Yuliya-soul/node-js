const uuid = require('uuid');
class Task {
  constructor({
    id = uuid(),
    title = 'string',
    order = 0,
    description = 'string',
    userId = 'string',
    boardId = 'string'
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
  }
  static toResponseTask(task) {
    const { id, title, order, description, userId, boardId } = task;
    return { id, title, order, description, userId, boardId };
  }
}
module.exports = Task;
