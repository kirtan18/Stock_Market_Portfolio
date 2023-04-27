const Joi = require('joi');

module.exports = {
  register: {
    body: Joi.object({
      userName: Joi.string().required(),
      userEmail: Joi.string().email({ tlds: { allow: false } }).required(),
      userPassword: Joi.string().required()
    })
  },
  login: {
    body: Joi.object({
      userEmail: Joi.string().email({ tlds: { allow: false } }).required(),
      userPassword: Joi.string().required()
    })
  }
};
