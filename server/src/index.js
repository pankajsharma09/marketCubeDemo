const { mergeTypes, fileLoader } = require('merge-graphql-schemas');
const path = require('path');
const resolvers = require('./module');

const typesArray = fileLoader(path.join(__dirname, '/**/*.graphql'))

const typeDefs = mergeTypes(typesArray, { all: true });


module.exports =
  {
    resolvers,
    typeDefs
  }