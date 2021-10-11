const router = require('express').Router();

const {
  validateLogin,
  validateRegistration,
} = require('../users/users.validation');

const {
  logInUser,
  registerUser,
} = require('./auth.service');

router.post('/login', validateLogin, logInUser);
router.post('/registration', validateRegistration, registerUser);

module.exports = router;
