const User = require('../../models/user.model');
const ApolloError = require('apollo-server-express')
const bcrypt = require('bcrypt');

const { USER_CREATED, pubsub } = require('../../subscription');

const Mutation = {
    //save the user
    addUser: async (_, args) => {
        try {

            const { email, password } = args;
            if (email == null || email == '') {
                throw new ApolloError('Email cant be blank');
            }
            const existingUser = await User.find({ "email": email });
            if (existingUser.length != 0) {
                return { 'response': 'User Exist' }
            }
            if (password == null || password == '') {
                throw new ApolloError('Password cant be blank');
            }
            let res = await User.create(args);
            await pubsub.publish(USER_CREATED, { newUserCreated: res });
            return res;
        }
        catch (e) {
            return e.message;
        }

    },
    userAuthenticate: async (parent, args, context, info) => {
        try {
            const { email, password } = args;
            let userDetail;
            if (email != '') {
                userDetail = await User.find({ "email": email })
                if (!userDetail.length) {
                    return { 'response': 'INVALID' }
                }
            }
            if (password != '') {
                const passwordIsTrue = await bcrypt.compare(password, userDetail[0].password);
                if (!passwordIsTrue) {
                    return { 'response': 'INVALID' }
                }
            }
            return { 'id': userDetail[0]._id, 'email': userDetail[0].email, 'response': 'VALID' }
        }
        catch (e) {
            throw new ApolloError('Network Error', 404, e);
        }
    }
}


module.exports = Mutation;
