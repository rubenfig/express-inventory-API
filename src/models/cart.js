import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

const cartSchema = Schema({
  products: [{
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      default: 0
    },
    price: {
      type: Number,
      default: 0
    },
  }],
  completed_on: {
    type: Date
  },
  client: {
    type: String,
    required: false,
    default: 'N/A'
  },
  modified_on: {
    type: Date
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'canceled', 'complete']
  }
});

const Cart = mongoose.models.Cart || mongoose.model('Cart', cartSchema);

module.exports = Cart;
