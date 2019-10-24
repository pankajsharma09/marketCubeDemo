const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Seller
const Seller = new Schema({
  org_name:{
      type:String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  status: {
    type: Number
  },
  plan_type:{
    type: String
  },
  plan_price:{
    type: String
  },
  createDate: {
    type: Date
  },
  updateDate: {
    type: Date
  }
}, {
  collection: 'sellers'
});

module.exports = mongoose.model('seller', Seller);