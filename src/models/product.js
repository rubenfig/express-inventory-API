const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  quantity: {
    type: Number,
    unique: false,
    required: true,
    default: 0
  },
  code: {
    type: String,
    required: false,
    default: ''
  },
  originalPrice: {
    type: Number,
    unique: false,
    required: true,
    default: 0
  },
  currentPrice: {
    type: Number,
    unique: false,
    required: true,
    default: 0
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  },
  metric: {
    type: Schema.Types.ObjectId,
    ref: 'Metric'
  },
  reserved: [
    {
      quantity: {
        type: Number,
      },
      _id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      created_on: {
        type: Date
      }
    }
  ]
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

module.exports = Product;
