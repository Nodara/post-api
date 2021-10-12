const { StatusCodes } = require('http-status-codes');
const signale = require('signale');
const Post = require('./posts.model');

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
    const { id } = req.body;
    const userId = req.user.id;
    const data = await Post.findOne({ where: { id, userId } });
    return res.json(data);
  } catch (err) {
    signale.error('Error in showPostById : ', err);
    return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.body;
    const userId = req.user.id;
    await Post.destroy({ where: { id, userId } });
    return res.json(`post ${id} is deleted succesfully`);
  } catch (err) {
    signale.error('Error in deletePost : ', err);
    return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};
module.exports = {
  addPost,
  showUserPosts,
  deletePost,
  showPostById,
};
