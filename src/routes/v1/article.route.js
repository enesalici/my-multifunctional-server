const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const articleController = require('../../controllers/article.controller');
const articleValidation = require('../../validations/article.validation');

const router = express.Router();

router.route('/')
.post(validate(articleValidation.createArticle), articleController.createArticle)
.get(articleController.getArticles);

router.route('/:articleId')
.get(articleController.getArticleById)
.patch(articleController.updateArticleById)
.delete(articleController.deleteArticleById);

module.exports = router;
