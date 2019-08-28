import {expect} from "chai";
import mongoUnit from "mongo-unit";
import {describe} from "mocha";

import {ProductService} from "../../src/services/product";

const testMongoUrl = process.env.MONGO_URL;

describe('ProductService', () => {
  const testData = require('./testingDB.js');
  beforeEach(() => mongoUnit.initDb(testMongoUrl, testData));
  afterEach(() => mongoUnit.drop());

  it('should find all products', () => {
    return ProductService.listProducts()
      .then(products => {
        expect(products.length).to.equal(2);
        expect(products[0].name).to.equal('Cable');
        expect(products[0].category.name).to.equal('Motos');
        expect(products[0].metric.name).to.equal('Metros');
      })
  });

  it('should create new product', () => {
    return ProductService.createProduct({
        quantity:5,
        code:"CINT2",
        originalPrice:5000,
        currentPrice:10000,
        name:"Cobre",
        metric:"5d1e6707f180df68e6544d95",
        category:"5d1e6bd38d220f701983b945"
      })
      .then(product => {
        expect(product.name).to.equal('Cobre');
      })
      .then(() => ProductService.listProducts())
      .then(products => {
        expect(products.length).to.equal(3);
        expect(products[2].name).to.equal('Cobre');
      })
  });

  it('should remove product', () => {
    return ProductService.listProducts()
      .then(products => products[0]._id)
      .then(productId => ProductService.deleteProduct(productId))
      .then(() => ProductService.listProducts())
      .then(products => {
        expect(products.length).to.equal(1)
      })
  });

  it('should update product', () => {
    return ProductService.listProducts()
      .then(products => products[0])
      .then(product => {
        product.name = 'Testing update';
        return ProductService.updateProduct(product._id, product);
      })
      .then(() => ProductService.listProducts())
      .then(products => {
        expect(products.length).to.equal(2);
        expect(products[0].name).to.equal('Testing update');
      })
  });
});
