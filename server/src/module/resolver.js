const { Query: userQuery,
    Mutation: UserMutation,
    Subscription: userSubscription
} = require('./user');

const resolvers = {
    Query: {
        ...userQuery
    },
    Mutation: {
        ...UserMutation
    },
    Subscription: {
        ...userSubscription
    }
}

module.exports = resolvers;