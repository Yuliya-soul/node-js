const uuid = require('uuid');
class Task {
  constructor({
    id = uuid(),
    title = 'string',
    order = 0,
    description = 'string',
    userId = 'string',
    idBoard = 'string'
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.idBoard = idBoard;
  }
  static toResponseTask(task) {
    const { id, title, order, description, userId } = task;
    return { id, title, order, description, userId };
  }
}
module.exports = Task;
