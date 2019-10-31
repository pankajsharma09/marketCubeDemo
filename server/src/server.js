const express = require('express');
const http = require('http');
const { ApolloServer,makeExecutableSchema} =  require('apollo-server-express');
const {importSchema} = require('graphql-import');
const configuration =require( './config/database');
const schema = require('./index');
const PORT =  9000;

const mongoose = require('./config/database');

const server = new ApolloServer({
   schema: makeExecutableSchema(schema)

});

const app = express();
server.applyMiddleware({ app });
const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: PORT }, () => {
   console.log(` Server ready at http://localhost:${PORT}${server.graphqlPath}`)
   //  console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`)
});