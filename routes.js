const router = require('express').Router();
const auth = require('./Auth/auth.controller');
const posts = require('./posts/post.controller');

router.use('/posts', posts);
router.use('/auth', auth);

module.exports = router;
