const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for User 
const Product = new Schema({
  productName: {
    type: String
  },
  productDesc: {
    type: String
  },
  prodcutImageUrl: {
    type: String
  },
  numberOfVariants: {
    type: String
  },
  status: {
    type: Number
  },
  createDate: {
    type: Date
  },
  updateDate: {
    type: Date
  },
  createBy: {
    type: String
  },
  updateBy: {
    type: String
  }



}, {
  collection: 'product'
});
 
module.exports = mongoose.model('product', Product);
