const User =require( '../../models/user.model');
const Mutation= {
    addUser: async (_, args) => {
        try{
            console.log(args);
            let res = await User.create(args)
            return res;
        }
        catch(error){
            return e.message;
        }

    }
}

module.exports =Mutation;