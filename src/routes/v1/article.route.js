const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const articleController = require('../../controllers/article.controller');
const articleValidation = require('../../validations/article.validation');

const router = express.Router();

router
  .route('/')
  .post(auth('user'), validate(articleValidation.createArticle), articleController.createArticle)
  .get(auth('user'), validate(articleValidation.getArticles), articleController.getArticles);

router
  .route('/:articleId')
  .get(auth('user'), validate(articleValidation.getArticleById), articleController.getArticleById)
  .patch(auth('user'), validate(articleValidation.updateArticleById), articleController.updateArticleById)
  .delete(auth('user'), validate(articleValidation.deleteArticleById), articleController.deleteArticleById);

module.exports = router;
