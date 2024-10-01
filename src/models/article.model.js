const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const articleSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 25,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

articleSchema.plugin(toJSON);
articleSchema.plugin(paginate);

const Article = mongoose.model('Article', articleSchema);
module.exports = Article;
