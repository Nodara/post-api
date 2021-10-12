const { StatusCodes } = require('http-status-codes');
const signale = require('signale');
const jwt = require('jsonwebtoken');

const requireAuth = async (req, res, next) => {
  try {
    try {
      const token = req.headers.authorization.replace('Bearer ', '');
      const verify = await jwt.verify(token, process.env.TOKEN_KEY);
      req.user = { id: verify.id };
      return next();
    } catch (err) {
      return res.sendStatus(StatusCodes.UNAUTHORIZED);
    }
  } catch (err) {
    signale.error('Failed to user registratoin', err);
    return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

module.exports = {
  requireAuth,
};
