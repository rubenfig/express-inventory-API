import {expect} from "chai";
import mongoUnit from "mongo-unit";
import {describe} from "mocha";
import app from '../../app';

import {CategoryService} from "../../src/services/category";

const testMongoUrl = process.env.MONGO_URL;

describe('CategoryService', () => {
  const testData = require('./testingDB.js');
  beforeEach(() => mongoUnit.initDb(testMongoUrl, testData));
  afterEach(() => mongoUnit.drop());

  it('should find all categories', () => {
    return CategoryService.listCategories()
      .then(categories => {
        expect(categories.length).to.equal(3);
        expect(categories[0].name).to.equal('Ferretería');
      })
  });

  it('should create new category', () => {
    return CategoryService.createCategory({name: 'test' })
      .then(category => {
        expect(category.name).to.equal('test');
      })
      .then(() => CategoryService.listCategories())
      .then(categories => {
        expect(categories.length).to.equal(4);
        expect(categories[3].name).to.equal('test');
      })
  });

  it('should remove category', () => {
    return CategoryService.listCategories()
      .then(categories => categories[0]._id)
      .then(categoryId => CategoryService.deleteCategory(categoryId))
      .then(() => CategoryService.listCategories())
      .then(categories => {
        expect(categories.length).to.equal(2)
      })
  });

  it('should update category', () => {
    return CategoryService.listCategories()
      .then(categories => categories[0])
      .then(category => {
        category.name = 'Testing update';
        return CategoryService.updateCategory(category._id, category);
      })
      .then(() => CategoryService.listCategories())
      .then(categories => {
        expect(categories.length).to.equal(3);
        expect(categories[0].name).to.equal('Testing update');
      })
  });
});
