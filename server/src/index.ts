import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
dotenv.config();

import { typeDefs, resolvers } from './graphql';
import dbConnection from './database';

const app = express();

app.use(express.json());

const startServer = async (app: Application) => {
  const db = await dbConnection();

  const context = () => ({
    db
  });

  const server = new ApolloServer({ typeDefs, resolvers, context });
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  app.listen(process.env.PORT, () => {
    console.log(`app started on port ${process.env.PORT}`);
  });
};

startServer(app);
