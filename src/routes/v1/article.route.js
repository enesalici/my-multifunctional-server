const express = require('express');
const articleController = require('../../controllers/article.controller');

const router = express.Router();

router
.route('/')
.post(articleController.createArticle);


module.exports = router;
