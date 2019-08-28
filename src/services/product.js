import {ObjectID} from "mongodb";

import Product from "../models/Product";

export class ProductService {
  static async createProduct(product) {
    // Create a new product
    let newProduct = new Product(product);
    await newProduct.save();
    return newProduct;
  };

  static async listProducts(params) {
    return await Product.find(params).populate('metric').populate('category');
  }

  static async getProduct(productId) {
    return await Product.findOne({"_id": productId}).populate('metric').populate('category');
  }

  static async updateProduct(productId, product) {
    return await Product.findOneAndUpdate({_id: productId}, {$set: product}, {useFindAndModify: false, new: true});
  }

  static async deleteProduct(productId) {
    return await Product.deleteOne({"_id": productId});
  }
}
