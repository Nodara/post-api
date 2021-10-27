const { StatusCodes } = require('http-status-codes');
const signale = require('signale');
const User = require('../users/user.model');

const requireAuth = async (req, res, next) => {
  try {
    // ამოვიღოთ userId სესიიდან
    const { user } = req.session;

    // // თუ სესიიდან userId ვერ ამოვიღეთ ან/და sessions-ობიექტში ვერ მოიძებნა სესია ამ აიდით
    if (!user) {
      return res.sendStatus(StatusCodes.UNAUTHORIZED);
    }

    const checkUserId = await User.findOne({ where: { id: user } });

    if (!checkUserId) {
      return res.sendStatus(StatusCodes.NOT_FOUND);
    }
    if (!req.session) {
      return next();
    }
    return res.sendStatus(StatusCodes.UNAUTHORIZED);
  } catch (err) {
    signale.error('Failed in auth', err);
    return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

module.exports = {
  requireAuth,
};
