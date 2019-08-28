import Cart from "../models/Cart";
import Product from "../models/Product";

export class CartService {
  // Add item to cart
  static async addItem(addedProduct, userId) {
    let exists = await Cart.findOne({
      user: userId,
      "products.product": addedProduct.product,
      status: 'active'
    });
    if(exists) {
      // Item already added
      throw {error: 'Item ya en el carro'};
    }
    await Cart.findOneAndUpdate(
      { user: userId, status: 'active' },
      {
        $set: { modified_on: new Date() },
        $push: { products: addedProduct}
      },
      {
        useFindAndModify: false,
        upsert: true
      }
    );
    const updateResult = await Product.updateOne({
      _id: addedProduct.product,
      quantity: { $gte: addedProduct.quantity }
    }, {
      $inc: { quantity: -addedProduct.quantity },
      $push: {
        reserved: {
          quantity: addedProduct.quantity, _id: userId, created_on: new Date()
        }
      }
    });
    if (updateResult.nModified === 0){
      await Cart.updateOne({
        user: userId,
        status: "active"
      }, {
        $set: { modified_on: new Date() },
        $pull: { products: addedProduct}
      });
      // Rollback if there is no available stock
      throw {error: 'No hay suficiente stock'}
    }
    return {message: 'Item agregado con éxito'};
  };

  static async updateItem(updatedProduct, userId) {
    const cart = await Cart.findOne({
      user: userId,
      "products.product": updatedProduct.product,
      status: 'active'
    });
    if(!cart) {
      //throw error if doesnt exist
      throw {error: 'No existe el item en el carro'};
    }
    const oldQuantity = cart.products.filter(p => p.product.toString() === updatedProduct.product).reduce((sum, p) => sum + p.quantity, 0);
    const delta = updatedProduct.quantity - oldQuantity;
    const updated = await Cart.updateOne({
      user: userId,
      "products.product": updatedProduct.product,
      status: "active"
    }, {
      $set: {
        modified_on: new Date(),
        "products.$.quantity": updatedProduct.quantity
      }
    });
    if (updated && updated.nModified === 0) {
      throw {error: 'No existe el carro'};
    }
    const productUpdate = await Product.updateOne({
        _id: updatedProduct.product,
        "reserved._id": userId,
        quantity: {
          $gte: delta
        }
      }, {
      $inc: { quantity: -delta },
      $set: {
        "reserved.$.quantity": updatedProduct.quantity, modified_on: new Date()
      }
    });
    if (productUpdate.nModified === 0) {
      await Cart.updateOne({
        user: userId,
        "products.product": updatedProduct.product,
        status: "active"
      }, {
        $set: {
          modified_on: new Date(),
          "products.$.quantity": oldQuantity
        }
      });
      // Rollback if there is no available stock
      throw {error: 'No hay suficiente stock'}
    }
    return {message: 'Item editado con éxito'};
  }

  // Clear current cart
  static async clearCart(userId) {
    let cart = await Cart.findOne({
      user: userId,
      status: 'active'
    });
    if (cart){
      cart.products.forEach( async product => {
        await Product.updateOne({
          _id: product.product,
          "reserved._id": userId,
          "reserved.quantity": product.quantity
        }, {
          $inc: { quantity: product.quantity },
          $pull: { reserved: { _id: userId }}
        });
      });

      await Cart.updateOne({
        _id: cart._id
      }, {
        $set: { products: []}
      });
    }

  }

  // Checkout the order
  static async complete(client, userId) {
    await Product.updateMany({
      "reserved._id": userId
    }, {
      $pull: { reserved: {_id: userId }}
    });

    return await Cart.findOneAndUpdate({
      user: userId,
      status: 'active'
    }, {
      $set: {
        client: client.name,
        completed_on: new Date(),
        status: 'complete'
      }
    }, {useFindAndModify: false, new: true});
  }

  static async listCarts(params) {
    return await Cart.find(params).populate('products.product').populate('user');
  }

  static async getCart(cartId) {
    return await Cart.findOne({"_id": cartId}).populate('products.product').populate('user');
  }

  static async currentCart(userId) {
    return await Cart.findOne({
      user: userId,
      status: 'active'
    }).populate('products.product').populate('user');
  }

  static async deleteCart(cartId) {
    return await Cart.deleteOne({"_id": cartId});
  }
}
