const User =require( '../../models/user.model');

const bcrypt = require('bcrypt');

const {USER_CREATED, pubsub} = require('../../subscription');

const Mutation= {
    //save the user
    addUser: async (_, args) => {
        try{
         let email =args.email;
         if(email==null || email==''){
            throw new ApolloError('Email cant be blank');
           }    
        let password = args.password;
        if(password==null || password==''){
         throw new ApolloError('Password cant be blank');
        }
        
        console.log("save user started..");
        let res = await User.create(args);
        console.log("save user completed..")
        await pubsub.publish(USER_CREATED, { newUserCreated: res });
        return res;
        }
        catch(e){
            return e.message;
        }
    
    },
    userAuthenticate : async(parent, args, context, info) => {
            try{
                let email = args.email;
                let userDetail;
                if(email != ''){
                    userDetail = await User.find({"email":email})
                    if(typeof userDetail == 'undefined' || userDetail.length == 0){
                        return {'response':'credential not found'}
                    }
                }
                let password = args.password;
                if(password != ''){
                    const passwordIsTrue = await bcrypt.compare(password, userDetail[0].password);
                    if(!passwordIsTrue){
                        return {'response' : 'credential not found'}
                    }
                }
                return {'id':userDetail[0]._id,'email':userDetail[0].email,'response' : 'credential found'}
            }
            catch(e){
                throw new ApolloError('Network Error', 404, e);
            }
        }
    }     
        

module.exports = Mutation;