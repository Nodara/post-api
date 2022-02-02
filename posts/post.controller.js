const errorHandler = require('../util/errorHandling/errors');
const PostService = require('./post.service');

const addPost = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, text, image } = req.body;
    const id = await PostService.createPost({
      userId,
      title,
      text,
      image,
    });
    return res.json({ id });
  } catch (error) {
    return errorHandler(error, res);
  }
};

const getPost = async (req, res) => {
  try {
    const {
      id,
      userId,
      title,
      dateFrom,
      dateTo,
      isDeleted,
    } = req.params;

    const data = PostService.getPost({
      id,
      userId,
      title,
      dateFrom,
      dateTo,
      isDeleted,
    });

    return res.json({ data });
  } catch (error) {
    return errorHandler(error, res);
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.user.id;

    const message = await PostService.deletePost({ id, userId });

    return res.json({ message });
  } catch (error) {
    return errorHandler(error, res);
  }
};

const updatePost = async (req, res) => {
  try {
    const { id: userId } = req.user.id;
    const { title, text, image } = req.body;
    const { id } = req.params;

    const message = await PostService.editPost({
      id,
      userId,
      title,
      text,
      image,
    });

    return res.json({ message });
  } catch (error) {
    return errorHandler(error, res);
  }
};

module.exports = {
  addPost,
  getPost,
  deletePost,
  updatePost,
};
