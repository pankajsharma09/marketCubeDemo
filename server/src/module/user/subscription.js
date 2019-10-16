const {USER_CREATED, pubsub} = require('../../subscription');

const Subscription = {
    newUserCreated: {
        subscribe: () => pubsub.asyncIterator([USER_CREATED]),
      }
}

module.exports = Subscription