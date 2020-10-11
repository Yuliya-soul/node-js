const TasksRepo = require('./tasks.memory.repository');

const getAllTasks = () => TasksRepo.getAllTasks();

module.exports = { getAllTasks };
