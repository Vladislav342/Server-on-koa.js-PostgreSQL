const Joi = require('joi');

const validationSchemaForId = Joi.object({
  id: Joi.number().integer(),
});

const validationSchemaForObject = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = {
  validationSchemaForId,
  validationSchemaForObject,
};
