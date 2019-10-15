const { model } = require( "mongoose");

const Query = {
      test : () => {
         console.log("hi ");
         return {id: "1", email: "test", password: "gjyhgjh"}},
   }


module.exports=  {Query};