const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const articleSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
    validate(value) {
      if (validator.isEmpty(value)) {
        throw new Error('Title cannot be empty');
      }
    },
  },
  message: {
    type: String,
    required: true,
  },
});

articleSchema.statics.isTitleEmpty = async function (title) {
  return validator.isEmpty(title);
};

articleSchema.plugin(toJSON);
articleSchema.plugin(paginate);

const Article = mongoose.model('Article', articleSchema);
module.exports = Article;

//todo there is no created date & updated date & deleted date FIX THAT later