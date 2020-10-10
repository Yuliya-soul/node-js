const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});
router.route('/:id').get(async (req, res) => {
  const user = await usersService.get(req.params.id);
  res.status(200).json(User.toResponse(user));
});
router.route('/').post(async (req, res) => {
  const user = await usersService.create(
    new User({
      login: req.body.login,
      id: req.body.id,
      password: req.body.password,
      name: req.body.name
    })
  );
  res.json(User.toResponse(user));
});
router.route('/:id').delete(async (req, res) => {
  const users = await usersService.remove(req.params.id);
  res.json(users.map(User.toResponse));
});
router.route('/:id').put(async (req, res) => {
  const user = await usersService.update(req.body, req.params.id);
  res.json(User.toResponse(user));
});
module.exports = router;
