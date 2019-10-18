const { model } = require("mongoose");
const User = require('../../models/user.model');

const Query = {
   getUsers: () => User.find({ isVendor: true })
}


module.exports = { Query };