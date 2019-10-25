const { model } = require("mongoose");
const Product = require('../../models/product.model');

const Query = {
   getProduct: () =>{
	   
	  return Product.find()
   },
   
   search: async (args)=> {
	   console.log(args);
	   const count = await context.prisma
	     .linksConnection({
	       where: {
	         OR: [
	           { productName: args.serchContent },
	           { productDesc: args.serchContent },
	         ],
	       },
	     })
	     .aggregate()
	     .count()
	   const links = await context.prisma.links({
	     where: {
	       OR: [
	         { productName: args.serchContent },
	         { productDesc: args.serchContent },
	       ],
	     },
	     skip: 0,
	     first: 1,
	     orderBy: Desc,
	   })
	   return {
	     count,
	     productName,
	   }
	 }
}


module.exports = { Query };
