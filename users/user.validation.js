const joi = require('joi');
const { checkJoiError } = require('../util/error.joi');

const validateLogin = (req, res, next) => {
  const { body } = req;

  const schema = joi.object().keys({
    email: joi.string()
      .email()
      .required(),
    password: joi.string()
      .min(8)
      .max(40),
  });
  return checkJoiError(res, next, body, schema);
};

const validateRegistration = (req, res, next) => {
  const { body } = req;

  const schema = joi.object().keys({
    firstname: joi.string()
      .min(2)
      .max(18)
      .required()
      .pattern(new RegExp(/^[A-Za-z]+$/)),

    lastname: joi.string()
      .min(2)
      .max(25)
      .required()
      .pattern(new RegExp(/^[A-Za-z]+$/)),

    password: joi.string()
      .min(8)
      .max(40),

    email: joi.string()
      .email()
      .required(),

  });

  return checkJoiError(res, next, body, schema);
};

module.exports = {
  validateLogin,
  validateRegistration,
};
