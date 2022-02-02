// const { required } = require('joi');
const Joi = require('joi');
const { checkJoiError } = require('../util/error.joi');

const validateUpdate = (req, res, next) => {
  const { body } = req;
  const schema = Joi.object({
    title: Joi.string()
      .min(2)
      .max(30)
      .required(),

    text: Joi.string()
      .min(2)
      .max(30)
      .required(),

  });
  return checkJoiError(res, next, body, schema);
};

const validateAddData = (req, res, next) => {
  const { body } = req;
  const schema = Joi.object({
    title: Joi.string()
      .min(2)
      .max(30)
      .required(),

    text: Joi.string()
      .min(2)
      .max(30)
      .required(),

  });
  return checkJoiError(res, next, body, schema);
};

module.exports = {
  validateUpdate,
  validateAddData,
};
