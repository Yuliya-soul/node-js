const router = require('express').Router();
const Board = require('./board.model');
const boardsRepo = require('../boards/board.service');

router.route('/').get(async (req, res) => {
  try {
    const boards = await boardsRepo.getAll();
    res.status(200).json(boards.map(Board.toResponseBoard));
  } catch (e) {
    res.status(400).send(' not found');
  }
});
router.route('/:id').get(async (req, res) => {
  try {
    const board = await boardsRepo.get(req.params.id);
    res.status(200).json(Board.toResponseBoard(board));
  } catch (e) {
    res.status(400).send(' not found');
  }
});
router.route('/').post(async (req, res) => {
  try {
    const board = await boardsRepo.create(
      new Board({
        id: req.body.id,
        title: req.body.title,
        columns: req.body.columns
      })
    );
    res.status(200).json(Board.toResponseBoard(board));
  } catch (e) {
    res.status(400).send(' not found');
  }
});
router.route('/:id').delete(async (req, res) => {
  try {
    const boards = await boardsRepo.remove(req.params.id, req.params.boardId);
    // boards.map(Board.toResponseBoard)
    res.status(boards.status).json(boards.result);
  } catch (e) {
    res.status(404).send(' not found');
  }
});
router.route('/:id').put(async (req, res) => {
  try {
    const board = await boardsRepo.update(req.body, req.params.id);
    res.json(Board.toResponseBoard(board));
  } catch (e) {
    res.status(400).send(' not found');
  }
});

module.exports = router;
