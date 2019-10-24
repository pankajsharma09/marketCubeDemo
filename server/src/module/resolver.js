const { Query: userQuery,
    Mutation: UserMutation,
    Subscription: userSubscription
} = require('./user');
const { Query: productQuery 
    } = require('./product');

const { Query: sellerQuery 
	} = require('./seller');

const resolvers = {
    Query: {
        ...userQuery,
        ...productQuery,
        ...sellerQuery
    },
    Mutation: {
        ...UserMutation
    },
    Subscription: {
        ...userSubscription
    }
}

module.exports = resolvers;