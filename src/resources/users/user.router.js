const router = require('express').Router();
// const User = require('./user.model');
const User = require('./user.db.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  try {
    const users = await usersService.getAll();
    res.status(200).json(users.map(User.toResponse));
  } catch (e) {
    res.status(400).send('Access token is missing or invalid');
  }
});
router.route('/:id').get(async (req, res) => {
  try {
    const user = await usersService.get(req.params.id);
    res.status(200).json(User.toResponse(user));
  } catch (e) {
    res.status(400).send(' not found');
  }
});
router.route('/').post(async (req, res) => {
  try {
    const user = await usersService.create(
      new User({
        login: req.body.login,
        id: req.body.id,
        password: req.body.password,
        name: req.body.name
      })
    );
    res.status(200).json(User.toResponse(user));
  } catch (e) {
    res.status(400).send(' not found');
  }
});
router.route('/:id').delete(async (req, res) => {
  try {
    const removedUser = await usersService.remove(req.params.id);
    return res.status(200).json(User.toResponse(removedUser));
  } catch (err) {
    res.status(400).send(' not found');
  }
});

router.route('/:id').put(async (req, res) => {
  try {
    const user = await usersService.update(req.body, req.params.id);
    res.status(200).json(User.toResponse(user));
  } catch (e) {
    res.status(400).send(' not found');
  }
});
module.exports = router;
