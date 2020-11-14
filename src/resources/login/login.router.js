const router = require('express').Router();
const usersService = require('../users/user.service');

router.route('/').post(async (req, res) => {
  const checkedUserToken = await usersService.postLogin(
    req.body.login,
    req.body.password
  );

  return res.status(checkedUserToken.status).json(checkedUserToken.result);
});
module.exports = router;
