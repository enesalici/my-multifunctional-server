const httpStatus = require('http-status');
const { articleService, userService } = require('../services');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const pick = require('../utils/pick');

const createArticle = catchAsync(async (req, res) => {
  const articleData = {
    userId: req.user.id,
    title: req.body.title,
    message: req.body.message,
  };

  const article = await articleService.createArticle(articleData);
  res.status(httpStatus.CREATED).send(article);
});

const getArticleById = catchAsync(async (req, res) => {
  const article = await articleService.getArticleById(req.params.articleId);
  if (!article) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Article not found');
  }
  res.send(article);
});

const updateArticleById = catchAsync(async (req, res) => {
  const article = await articleService.updateArticleById(req.params.articleId, req.body);
  if (!article) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Article not found');
  }
  res.send(article);
});

const deleteArticleById = catchAsync(async (req, res) => {
  await articleService.deleteArticleById(req.params.articleId);
  res.status(httpStatus.NO_CONTENT).send();
});

const getArticles = catchAsync(async (req, res) => {
  const userId = req.user.id;

  const filter = pick(req.query, ['title', 'message']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);

  if (filter.title) {
    filter.title = { $regex: filter.title, $options: 'i' };
  }

  if (filter.message) {
    filter.message = { $regex: filter.message, $options: 'i' };
  }

  const result = await articleService.queryArticles(userId, filter, options);
  res.send(result);
});

module.exports = {
  createArticle,
  getArticleById,
  updateArticleById,
  deleteArticleById,
  getArticles,
};
