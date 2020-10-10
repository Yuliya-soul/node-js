const router = require('express').Router();
const Board = require('./board.model');
const boardsRepo = require('../boards/board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsRepo.getAll();
  res.json(boards.map(Board.toResponseBoard));
});
module.exports = router;
