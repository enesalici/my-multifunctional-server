const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createArticle = {
  body: Joi.object().keys({
    title: Joi.string().required().pattern(/^\S.*/).min(3).max(25).trim().messages({
      'string.empty': 'Title cannot be empty',
      'string.min': 'Title must be at least 3 characters long',
      'string.max': 'Title must not exceed 25 characters',
    }),
    message: Joi.string(),
  }),
};

const updateArticleById = {
  params: Joi.object().keys({
    articleId: Joi.string().trim().required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string().pattern(/^\S.*/).min(3).max(25).trim().messages({
        'string.empty': 'Title cannot be empty',
        'string.min': 'Title must be at least 3 characters long',
        'string.max': 'Title must not exceed 25 characters',
      }),
      message: Joi.string(),
    })
    .min(1),
};

const deleteArticleById = {
  params: Joi.object().keys({
    articleId: Joi.string().trim().required().custom(objectId),
  }),
};

const getArticleById = {
  params: Joi.object().keys({
    articleId: Joi.string().trim().required().custom(objectId),
  }),
};

const getArticles = {
  query: Joi.object().keys({
    title: Joi.string().allow('').optional().pattern(/^\S.*/).messages({
      'string.pattern.base': 'Title cannot start with a space',
    }),
    message: Joi.string().allow('').optional(),
    sortBy: Joi.string().valid('createdAt', 'updatedAt', '-updatedAt', '-createdAt').optional(),
    limit: Joi.number().integer().min(1).optional(),
    page: Joi.number().integer().min(1).optional(),
  }),
};

module.exports = {
  createArticle,
  updateArticleById,
  deleteArticleById,
  getArticleById,
  getArticles,
};
