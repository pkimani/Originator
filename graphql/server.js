const { ApolloServer } = require('apollo-server');
const fs = require('fs');
const path = require('path');
const resolvers = require('./resolvers');

// Load schema from schema.graphql file
const typeDefs = fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8');

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// The `listen` method launches a web server on a specified port, or port 4000 by default.
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
