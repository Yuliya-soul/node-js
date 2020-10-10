const uuid = require('uuid');
class Board {
  constructor({
    id = uuid(),
    title = 'string',
    order = 0,
    columns = [
      {
        id,
        title,
        order
      }
    ]
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  static toResponseBoard(board) {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}
module.exports = Board;
