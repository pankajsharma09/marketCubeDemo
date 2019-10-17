const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

// Define collection and schema for Business
let User = new Schema({
  email: {
    type: String
  },
   password: {
    type: String
  },
  isVendor: {
    type: Boolean
  },
  brandName:{
    type: String
  },
  status:{
    type: Number
  },
  createDate:{
    type: Date
  },
  updateDate:{
    type: Date
  },
  firstName:{
    type: String
  },
  lastName:{
    type: String
  }

  

},{
    collection: 'user'
});
User.pre('save', async function (next) {
  // Hash the password before saving the user model
 const user = this
  if (user.isModified('password')) {
      user.password = await bcrypt.hash(user.password, 8)
      user.createDate= new Date()
      user.updateDate=new Date()
      user.status=1
      user.isVendor=true
    
  }
  next()
})
module.exports = mongoose.model('user', User);