import express, { Application, Request, Response } from 'express';
import { ApolloServer } from 'apollo-server-express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import compression from 'compression';
dotenv.config();

import { typeDefs, resolvers } from './graphql';
import dbConnection from './database';

const app = express();

app.use(express.json({ limit: '2mb' }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(compression());

app.use(express.static(`${__dirname}/client`));
app.get('*', (_req, res) => res.sendFile(`${__dirname}/client/index.html`));

const startServer = async (app: Application) => {
  const db = await dbConnection();

  const context = ({ req, res }: { req: Request; res: Response }) => ({
    db,
    req,
    res
  });

  const server = new ApolloServer({ typeDefs, resolvers, context });
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  app.listen(process.env.PORT, () => {
    console.log(`app started on port ${process.env.PORT}`);
  });
};

startServer(app);
