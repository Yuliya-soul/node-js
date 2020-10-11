const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksRepo = require('../tasks/tasks.service');

router.route('/').get(async (req, res) => {
  console.log(req.params.boardId);
  try {
    const tasks = await tasksRepo.getAll(req.params.boardId);
    res.json(tasks.map(Task.toResponseTask));
  } catch (e) {
    res.status(400).send(' not found');
  }
});

router.route('/').post(async (req, res) => {
  try {
    const task = await tasksRepo.create(req.params.boardId, req.body);
    res.json(Task.toResponseTask(task));
  } catch (e) {
    res.status(400).send(' something went wrong');
  }
});

module.exports = router;
