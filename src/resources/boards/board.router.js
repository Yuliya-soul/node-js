const router = require('express').Router();
const Board = require('./board.model');
const boardsRepo = require('../boards/board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsRepo.getAll();
  res.json(boards.map(Board.toResponseBoard));
});
router.route('/:id').get(async (req, res) => {
  const board = await boardsRepo.get(req.params.id);
  res.status(200).json(Board.toResponseBoard(board));
});
router.route('/').post(async (req, res) => {
  const board = await boardsRepo.create(
    new Board({
      id: req.body.id,
      title: req.body.title,
      columns: req.body.columns
    })
  );
  res.json(Board.toResponseBoard(board));
});
router.route('/:id').delete(async (req, res) => {
  const boards = await boardsRepo.remove(req.params.id);
  res.json(boards.map(Board.toResponseBoard));
});
router.route('/:id').put(async (req, res) => {
  const board = await boardsRepo.update(req.body, req.params.id);
  res.json(Board.toResponseBoard(board));
});
module.exports = router;
