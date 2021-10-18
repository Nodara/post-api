// const { required } = require('joi');
const Joi = require('joi');
const { checkJoiError } = require('../util/error.joi');

const validateUpdate = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.number()
      .min(1)
      .required(),

    title: Joi.string()
      .min(2)
      .max(30)
      .required(),

    text: Joi.string()
      .min(2)
      .max(30)
      .required(),

  });
  return checkJoiError(req, res, next, schema);
};

const validateAddData = (req, res, next) => {
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
  return checkJoiError(req, res, next, schema);
};

module.exports = {
  validateUpdate,
  validateAddData,
};
