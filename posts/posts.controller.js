const router = require('express').Router();
const { requireAuth } = require('../Auth/auth.middleware');

const {
  addPost,
  showUserPosts,
  deletePost,
  showPostById,
} = require('./posts.service');

router.post('/add-post', requireAuth, addPost);

router.get('/show-posts', requireAuth, showUserPosts);

router.post('/show-post', requireAuth, showPostById);

router.post('/delete-post', requireAuth, deletePost);

module.exports = router;
