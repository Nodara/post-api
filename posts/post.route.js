const router = require('express').Router();

const {
  addPost,
  updatePost,
  deletePost,
  getPost,
} = require('./post.controller');

const {
  validateUpdate,
  validateAddData,
} = require('./post.validator');

router.post('/add-post', validateAddData, addPost);

router.put('/update-post', validateUpdate, updatePost);

router.delete('/delete-post/:id', deletePost);

router.get('/', getPost);
module.exports = router;
