const router = require('express').Router();
const auth = require('./Auth/auth.controller');
const posts = require('./posts/posts.controller');

router.use('/posts', posts);
router.use('/auth', auth);

module.exports = router;
