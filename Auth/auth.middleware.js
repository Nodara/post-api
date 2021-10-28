const { StatusCodes } = require('http-status-codes');
const signale = require('signale');
const User = require('../users/user.model');

const requireAuth = async (req, res, next) => {
  try {
    const { userId } = req.session;

    // if session does not have userId and/or sessionId couldn't find in redis db
    if (!userId) {
      return res.sendStatus(StatusCodes.UNAUTHORIZED);
    }
    // if user with this id exist in db
    const user = await User.findByPk(userId);
    if (!user) {
      signale.success(`no Found : ${userId}`);
      return res.sendStatus(StatusCodes.NOT_FOUND);
    }
    req.user = userId;

    return next();
  } catch (err) {
    signale.error('Failed in auth', err);
    return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

module.exports = {
  requireAuth,
};
