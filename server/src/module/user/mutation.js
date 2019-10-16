const User =require( '../../models/user.model');

const bcrypt = require('bcrypt');

const {USER_CREATED, pubsub} = require('../../subscription');

const Mutation= {
    //save the user
    addUser: async (_, args) => {
        try{
            console.log(args);
            let res = await User.create(args);
            await pubsub.publish(USER_CREATED, { newUserCreated: res });
            return res;
        }
        catch(e){
            return e.message;
        }

    },
    userAuthenticate : async(parent, args, context, info) => {
        let email = args.email;
        let userDetail;
        if(email != ''){
            userDetail = await User.find({"email":email})
            if(typeof userDetail == 'undefined' || userDetail.length == 0){
                throw new Error('email is not valid')
            }
        }
        let password = args.password;
        if(password != ''){
            const passwordIsTrue = await bcrypt.compare(password, userDetail[0].password);
            if(!passwordIsTrue){
                throw new Error('password not matched');
            }
        }  
        return {'user':userDetail[0]}
    }
}

module.exports = Mutation;