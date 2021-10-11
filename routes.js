const router = require('express').Router();
const auth = require('./Auth/auth.controller');
// const posts = require('./posts/posts.controller');
// const users = require('./users/users.controller');

// router.use('/posts', posts);
// router.use('/user', users);
router.use('/auth', auth);

module.exports = router;
