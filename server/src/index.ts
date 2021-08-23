import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import { typeDefs, resolvers } from './graphql';

const app = express();

app.use(express.json());

const startServer = async () => {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });
};
startServer();

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`app started on port ${PORT}`);
});
