import Category from "../models/Category";

export class CategoryService {

  // Create a new category
  static async createCategory(category) {
    let newCategory = new Category(category);
    await newCategory.save();
    return newCategory;
};

  static async listCategories(params) {
    return await Category.find(params);
  }

  static async getCategory(categoryId) {
    return await Category.findOne({"_id": categoryId});
  }

  static async updateCategory(categoryId, category) {
    return await Category.findOneAndUpdate({_id: categoryId}, {$set: category}, {useFindAndModify: false, new: true})
  }

  static async deleteCategory(categoryId) {
    return await Category.deleteOne({"_id": categoryId});
  }
}
