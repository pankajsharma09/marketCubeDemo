const { model } = require( "mongoose");
const User =require( '../../models/user.model');

const Query = {
      test : () => {
         console.log("hi ");
         return {id: "1", email: "test", password: "gjyhgjh"}},

      getUsers : () => {
            return User.find({isVendor:true});
      }
   }


module.exports=  {Query};