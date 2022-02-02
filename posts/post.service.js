const { Op } = require('sequelize');

const Post = require('./post.model');
const Users = require('../users/user.model');

const PostConstants = require('./post.constants');

const createPost = ({
  userId,
  title,
  text,
  image,
}) => Post.create({
  title, text, userId, image,
});

const getPost = ({
  id,
  userId,
  title,
  dateFrom,
  dateTo,
  isDeleted = false,
}) => Post.findAll({
  where: {
    ...(id && { id }),
    ...(userId && { userId }),
    ...(title && { [Op.like]: `%${title}%` }),

    [Op.and]: [
      { dateFrom: { createdAt: { [Op.gt]: new Date(dateFrom) } } },
      { dateTo: { createdAt: { [Op.lt]: new Date(dateTo) } } },
    ],
  },
  include: [
    {
      model: Users,
      as: 'user',
      required: true,
      attributes: [],
      where: {
        ...(isDeleted ? { deletedAt: { [Op.not]: null } } : { deletedAt: null }),
      },
    },
  ],
});

const deletePost = async ({ id, userId }) => {
  const post = await Post.findOne({ where: { id } });

  if (post.user.id === userId) {
    await Post.update({ deletedAt: new Date() }, { where: { id } });
    return PostConstants.DELETED;
  }

  return PostConstants.NOT_DELETED;
};

const updatePost = async ({
  id,
  userId,
  title,
  text,
  image,
}) => {
  const existedPost = await Post.findOne({ where: { id } });

  if (existedPost.userId === userId) {
    await Post.update({ title, text, image }, { where: { id, userId } });
    return PostConstants.UPDATED;
  }

  return PostConstants.NOT_UPDATED;
};

module.exports = {
  createPost,
  getPost,
  deletePost,
  updatePost,
};
