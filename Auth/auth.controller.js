const router = require('express').Router();

const {
  validateLogin,
  validateRegistration,
} = require('../users/user.validation');

const {
  logInUser,
  registerUser,
} = require('./auth.service');

router.post('/login', validateLogin, logInUser); // Authentication
router.post('/registration', validateRegistration, registerUser); // Registration

module.exports = router;
