const uuid = require('uuid');
class Task {
  constructor({
    id = uuid(),
    title = 'string',
    order = 0,
    description = 'string',
    userId = 'string',
    boardId = 'string',
    columnId = null
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
  static toResponseTask(task) {
    const { id, title, order, description, userId, boardId, columnId } = task;
    return { id, title, order, description, userId, boardId, columnId };
  }
}
module.exports = Task;
