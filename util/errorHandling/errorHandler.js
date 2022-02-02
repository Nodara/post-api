const signale = require('signale');

const { INTERNAL_SERVER_ERROR } = require('./error.constants');

/*
  function gets error message and response from controller
  if error is not specifically thrown from service this function will automatically
  recognize it as internal server error and will log it
*/
const errorHandler = (error, res) => {
  const { statusCode, message } = error;
  if (!statusCode) {
    signale.error(error);
    return res.status(500).json({ message: INTERNAL_SERVER_ERROR });
  }
  return res.status(statusCode).json({ message });
};

module.exports = errorHandler;
