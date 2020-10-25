const router = require('express').Router({ mergeParams: true });
const Task = require('./task.db.model');
const tasksRepo = require('../tasks/tasks.db.memory.repository');

router.route('/').get(async (req, res) => {
  try {
    const tasks = await tasksRepo.getAll(req.params.boardId);
    res.status(200).json(tasks.map(Task.toResponseTask));
  } catch (e) {
    res.status(401).send('Access token is missing or invalid');
  }
});

router.route('/').post(async (req, res) => {
  try {
    const task = await tasksRepo.create(req.params.boardId, req.body);
    res.status(200).json(Task.toResponseTask(task));
  } catch (e) {
    res.status(404).send(' something went wrong');
  }
});
router.route('/:id').get(async (req, res) => {
  try {
    const task = await tasksRepo.getById(req.params.id, req.params.boardId);
    res.status(200).json(Task.toResponseTask(task));
  } catch (e) {
    res.status(404).send('Access token is missing or invalid');
  }
});
router.route('/:id').delete(async (req, res) => {
  try {
    if (await tasksRepo.getById(req.params.id, req.params.boardId)) {
      const task1 = await tasksRepo.remove(req.params.id, req.params.boardId);
      res.json(Task.toResponseTask(task1));
    }
  } catch (e) {
    res.status(404).send('Access token is missing or invalid');
  }
});
router.route('/:id').put(async (req, res) => {
  try {
    const task = await tasksRepo.update(
      req.body,
      req.params.id,
      req.params.boardId
    );
    res.status(200).json(Task.toResponseTask(task));
  } catch (e) {
    res.status(400).send(' not found');
  }
});

module.exports = router;
