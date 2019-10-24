const { model } = require("mongoose");
const Product = require('../../models/product.model');

const Query = {
   getProduct: () =>{
	   
	  return Product.find()
   }
}


module.exports = { Query };