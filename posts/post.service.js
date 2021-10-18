const { StatusCodes } = require('http-status-codes');
const signale = require('signale');
const Post = require('./post.model');

const addPost = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, text } = req.body;
    const post = await Post.create({ title, text, userId });
    return res.json({ id: post.id });
  } catch (err) {
    signale.error('Error in addPost : ', addPost);
    return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

const showUserPosts = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await Post.findAll({
      where: {
        userId,
      },
    });
    return res.json(data);
  } catch (err) {
    signale.error('Error in showUserPosts : ', err);
    return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

const showPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const data = await Post.findOne({ where: { id, userId } });
    // If post by that id doesnot exist
    if (!data) {
      return res.status(StatusCodes.NOT_FOUND).send('incorrect id or it does not belong to user');
    }
    return res.json(data);
  } catch (err) {
    signale.error('Error in showPostById : ', err);
    return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const existedPost = await Post.findOne({ where: { id, userId } });
    if (existedPost) {
      await Post.destroy({ where: { id, userId } });
      return res.sendStatus(StatusCodes.OK);
    }
    return res.json('Unable to Delete');
  } catch (err) {
    signale.error('Error in deletePost : ', err);
    return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

const updatePost = async (req, res) => {
  try {
    const { id, title, text } = req.body;
    const userId = req.user.id;
    const existedPost = await Post.findOne({ where: { id, userId } });
    if (existedPost) {
      await Post.update({ title, text }, { where: [{ id, userId }] });
      return res.sendStatus(StatusCodes.OK);
    }
    return res.json('Unable to Update');
  } catch (err) {
    signale.error('Error in updatePost : ', err);
    return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

module.exports = {
  addPost,
  showUserPosts,
  deletePost,
  showPostById,
  updatePost,
};
