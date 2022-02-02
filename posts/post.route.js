const router = require('express').Router();

const {
  addPost,
  showUserPosts,
  showPostById,
  updatePost,
  deletePost,
} = require('./post.controller');

const {
  validateUpdate,
  validateAddData,
} = require('./post.validator');

router.post('/add-post', validateAddData, addPost);

router.get('/show-posts', showUserPosts);

router.get('/show-post/:id', showPostById);

router.put('/update-post', validateUpdate, updatePost);

router.delete('/delete-post/:id', deletePost);

module.exports = router;
