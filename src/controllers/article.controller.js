const httpStatus = require('http-status');
const { articleService } = require('../services');
const catchAsync = require('../utils/catchAsync');


const createArticle = catchAsync(async(req,res)=>{
    const article = await articleService.createArticle(req.body);
    res.status(httpStatus.CREATED).send(article);
});


module.exports ={
    createArticle,
}