const { StatusCodes } = require('http-status-codes');

// it accepts any type of schema (body, params, query...)
const checkJoiError = (res, next, data, schema, option = null) => {
  const { error } = schema.validate(data, option);
  if (!error) {
    return next();
  }

  const { message } = error.details[0];

  return res.status(StatusCodes.BAD_REQUEST).json(message);
};

module.exports = {
  checkJoiError,
};
