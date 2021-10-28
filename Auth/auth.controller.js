const router = require('express').Router();
const { requireAuth } = require('./auth.middleware');

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

router.post('/test', requireAuth); // Test if requireAuth works

module.exports = router;
