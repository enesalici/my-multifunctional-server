const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createArticle = {
  body: Joi.object().keys({
    userId: Joi.required().custom(objectId),
    title: Joi.string().required().pattern(/^\S.*/).min(3).max(25).trim().messages({
      'string.empty': 'Title cannot be empty',
      'string.min': 'Title must be at least 3 characters long',
      'string.max': 'Title must not exceed 25 characters',
    }),
    message: Joi.string(),
  }),
};



module.exports = {
  createArticle,
};
