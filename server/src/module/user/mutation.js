const Mutation = {
    addUser: async (parent, args, { dataSources },info) => {
        try{
            const data = await dataSources.userAPI.addUser(args.data);
            return data;
        }
        catch(error){
            return e.message;
        }

    },
    updateUser: async(parent, args, { dataSources },info) => {
        try{
            await User.updateOne({ _id: args.id }, { $set: args })
            return new UserValue( args.id,args);
        } catch (e) {
            return e.message;
        }
    },
    deleteUser:async(parent, args, { dataSources },info) => {
        let id = args.id;
        if(id != ''){
            try{
                await User.deleteOne({_id:id})
                return 1
            }catch(e){
                return e.message;
            }
        }else{
            return false
        }
    },
    getLoginDetails : async(parent, args, { dataSources },info) => {
        let email = args.gmail;
        let userDetail;
        if(email != ''){
            userDetail = await User.find({"gmail":email})
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
        const token = await jwt.sign({id:userDetail[0]._id,email:userDetail[0].email},'mysecretkey',{
            expiresIn:'1h'
        })
        //console.log('token',userDetail[0]._id)
        return {'id':userDetail[0]._id,'token':token,'tokenExpiration':1}
    }
}

export default Mutation;