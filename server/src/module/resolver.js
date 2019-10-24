const { Query: userQuery,
    Mutation: UserMutation,
    Subscription: userSubscription
} = require('./user');
const { Query: productQuery 
	} = require('./product');

const resolvers = {
    Query: {
        ...userQuery,
        ...productQuery
    },
    Mutation: {
        ...UserMutation
    },
    Subscription: {
        ...userSubscription
    }
}

module.exports = resolvers;