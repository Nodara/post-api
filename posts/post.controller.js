const { StatusCodes } = require('http-status-codes');
const signale = require('signale');
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
    signale.error('Error in addPost : ', error);
    return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
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
    signale.error('Error in getPost : ', error);
    return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.user.id;

    const message = await PostService.deletePost({ id, userId });

    return res.json({ message });
  } catch (error) {
    signale.error('Error in deletePost : ', error);
    return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
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
    signale.error('Error in updatePost : ', error);
    return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

module.exports = {
  addPost,
  getPost,
  deletePost,
  updatePost,
};
