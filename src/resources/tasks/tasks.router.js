const router = require('express').Router();
const Task = require('./task.model');
const tasksRepo = require('../tasks/tasks.service');

router.route('/').get(async (req, res) => {
  try {
    const tasks = await tasksRepo.getAllTasks();
    res.json(tasks.map(Task.toResponseTask));
  } catch (e) {
    res.status(400).send(' not found');
  }
});

module.exports = router;
