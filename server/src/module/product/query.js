const { model } = require("mongoose");
const Product = require('../../models/product.model');

const Query = {
   getProduct: () =>{
	   
	  return Product.find()
   },
   
   search: async ( _, args)=> {
	  
	   if(args.searchContent=='All' || args.searchContent=='' || args.searchContent==undefined){
		   
		   return Product.find();
		   
	   }else{
		 
		   return Product.find({$or:[
	        {"productName": {'$regex': '.*'+args.searchContent+'.*'}},
	        {"productDesc":{'$regex': '.*'+args.searchContent+'.*'}}
	    ]})
	   }
	   
	    
	   }
}


module.exports = { Query };
