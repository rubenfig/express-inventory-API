import * as mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);

module.exports = Category;
