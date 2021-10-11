const { StatusCodes } = require('http-status-codes');

const checkJoiError = (req, res, next, schema, option = null) => {
  const { body } = req;

  const { error } = schema.validate(body, option);

  if (!error) {
    return next();
  }

  const { message } = error.details[0];

  return res.status(StatusCodes.BAD_REQUEST).json(message);
};

module.exports = {
  checkJoiError,
};
