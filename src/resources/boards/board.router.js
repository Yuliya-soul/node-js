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
    const board = await boardsRepo.getById(req.params.id);
    if (board) {
      return res.status(200).json(Board.toResponseBoard(board));
    }
    return res.status(404).json('no');
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
    const removedBoard = await boardsRepo.remove(req.params.id);
    return res.json(Board.toResponseBoard(removedBoard));
  } catch (err) {
    res.status(400).send(' not found');
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
