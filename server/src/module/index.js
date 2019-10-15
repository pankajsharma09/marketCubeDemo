const  { Query : userQuery,
    Mutation : UserMutation
} =require( './user');

const resolvers = {
    Query : {
    ...userQuery 
    },
    Mutation : {
    ...UserMutation
    },
}

module.exports= resolvers;