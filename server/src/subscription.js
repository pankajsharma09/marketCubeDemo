const USER_CREATED = 'USER_CREATED';
const { PubSub } = require('apollo-server-express');

const pubsub = new PubSub();

module.exports = {
    USER_CREATED,
    pubsub
}