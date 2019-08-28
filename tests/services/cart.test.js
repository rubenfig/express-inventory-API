import {expect} from "chai";
import mongoUnit from "mongo-unit";
import {describe} from "mocha";

import {CartService} from "../../src/services/cart";
import {ProductService} from "../../src/services/product";

const testMongoUrl = process.env.MONGO_URL;

describe('CartService', () => {
  const testData = require('./testingDB.js');
  beforeEach(() => mongoUnit.initDb(testMongoUrl, testData));
  afterEach(() => mongoUnit.drop());

  it('should create a cart and add a product only once', () => {
    return CartService.addItem({ "product": "5d1e6bcd8d220f701983b936", "quantity": 2, "price": 1000}, "5d1e64756dea8866123962fd")
      .then(() => ProductService.getProduct("5d1e6bcd8d220f701983b936"))
      .then(product => {
        expect(product.quantity).to.equal(8);
      })
      .then(() => CartService.currentCart("5d1e64756dea8866123962fd"))
      .then(cart => {
        expect(cart.status).to.equal('active');
        expect(cart.user._id.toString()).to.equal('5d1e64756dea8866123962fd');
        expect(cart.products.length).to.equal(2);
        expect(cart.products[1].product._id.toString()).to.equal('5d1e6bcd8d220f701983b936');
        expect(cart.products[1].quantity).to.equal(2);
      })
      .then(async () => {
        try {
          return await CartService.addItem({ "product": "5d1e6bcd8d220f701983b936", "quantity": 2, "price": 1000}, "5d1e64756dea8866123962fd")
        } catch (e) {
          return e;
        }
      })
      .then(result => {
        expect(result.error).to.equal('Item ya en el carro');
      })
  });

  it('should update a cart and modify a product quantity', () => {
    return CartService.updateItem(
      {
          "product": "5d1e6bcd8d220f701983b949",
          "quantity": 1,
          "price": 1000
        }, "5d1e64756dea8866123962fd")
      .then(() => ProductService.getProduct("5d1e6bcd8d220f701983b949"))
      .then(product => {
        expect(product.quantity).to.equal(6);
      })
      .then(() => CartService.currentCart("5d1e64756dea8866123962fd"))
      .then(cart => {
        expect(cart.status).to.equal('active');
        expect(cart.user._id.toString()).to.equal('5d1e64756dea8866123962fd');
        expect(cart.products.length).to.equal(1);
        expect(cart.products[0].product._id.toString()).to.equal('5d1e6bcd8d220f701983b949');
        expect(cart.products[0].quantity).to.equal(1);
      })
  });

  it('should clear a cart', () => {
    return CartService.currentCart("5d1e64756dea8866123962fd")
      .then((cart) => {
        expect(cart.products.length).to.equal(1);
      })
      .then(() => CartService.clearCart("5d1e64756dea8866123962fd"))
      .then(() => CartService.currentCart("5d1e64756dea8866123962fd"))
      .then((cart) => {
        expect(cart.products.length).to.equal(0);
      })
      .then(() => ProductService.getProduct("5d1e6bcd8d220f701983b949"))
      .then(product => {
        expect(product.quantity).to.equal(7);
      })
  });

  it('should complete a cart', () => {
    return CartService.currentCart("5d1e64756dea8866123962fd")
      .then((cart) => {
        expect(cart.products.length).to.equal(1);
        expect(cart.status).to.equal("active");
      })
      .then(() => ProductService.getProduct("5d1e6bcd8d220f701983b949"))
      .then(product => {
        expect(product.reserved.length).to.equal(1);
        expect(product.quantity).to.equal(5);
      })
      .then(() => CartService.complete("cliente","5d1e64756dea8866123962fd"))
      .then((cart) => CartService.getCart(cart._id))
      .then((cart) => {
        expect(cart.products.length).to.equal(1);
        expect(cart.status).to.equal("complete");
      })
      .then(() => ProductService.getProduct("5d1e6bcd8d220f701983b949"))
      .then(product => {
        expect(product.reserved.length).to.equal(0);
        expect(product.quantity).to.equal(5);
      })
  });


});
