const router = require('express').Router();

const auth = require('./Auth/auth.controller');
const posts = require('./posts/post.route');
const { requireAuth } = require('./Auth/auth.middleware');

router.use(requireAuth);
router.use('/auth', auth);
router.use('/posts', posts);

module.exports = router;
