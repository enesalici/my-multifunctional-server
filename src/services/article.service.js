const httpStatus = require('http-status');
const { Article } = require('../models');
const { ApiError } = require('../utils/ApiError');


const createArticle = async (articleBody) => {
    if(await Article.isTitleEmpty(articleBody.title)){
        throw new ApiError(httpStatus.BAD_REQUEST, 'Title cannot be empty');
    }
    return Article.create(articleBody);
} 



module.exports ={
    createArticle,
}