const router = require('express').Router();
const { requireAuth } = require('../Auth/auth.middleware');

const {
  addPost,
  showUserPosts,
  deletePost,
  showPostById,
  updatePost,
} = require('./post.service');

const {
  validateUpdate,
  validateAddData,
} = require('./post.validation');

router.post('/add-post', validateAddData, requireAuth, addPost);

router.get('/show-posts', requireAuth, showUserPosts);

router.get('/show-post/:id', requireAuth, showPostById);

router.put('/update-post', validateUpdate, requireAuth, updatePost);

router.delete('/delete-post/:id', requireAuth, deletePost);

module.exports = router;
