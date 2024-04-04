// Necessary imports
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { MongoClient } from 'mongodb';
import { Sequelize } from 'sequelize';
import http from 'http';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

// Define the __dirname equivalent in ES Modules
const __dirname = dirname(fileURLToPath(import.meta.url));

// Define your GraphQL schema using SDL
const typeDefs = readFileSync(join(__dirname, 'schema.graphql'), 'utf-8');

// Initialize Sequelize for PostgreSQL
const sequelize = new Sequelize(process.env.POSTGRES_URI, {
  dialect: 'postgres',
});

// Initialize MongoDB
const mongoClient = new MongoClient(process.env.MONGODB_URI);

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

async function startApolloServer(typeDefs, resolvers) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async () => {
      // Make db and sequelize available in the context
      return { db: mongoClient.db(process.env.MONGO_DB), sequelize };
    },
  });

  await server.start();

  const app = express();
  const httpServer = http.createServer(app);

  app.use(
    '/graphql', // Assuming you want to serve GraphQL requests at "/graphql"
    express.json(), // For parsing JSON request bodies
    expressMiddleware(server, {
      // Optional Apollo Server configuration options
    })
  );

  await new Promise((resolve) => httpServer.listen({ port: process.env.PORT || 3001 }, resolve));

  console.log(`🚀 Server ready at http://localhost:${process.env.PORT || 3001}/graphql`);
}

async function connectToMongoDB() {
  try {
    await mongoClient.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
}

async function initializeServer() {
  try {
    await connectToMongoDB();
    await startApolloServer(typeDefs, resolvers);
  } catch (error) {
    console.error('Failed to start the server:', error);
    process.exit(1);
  }
}

initializeServer();
