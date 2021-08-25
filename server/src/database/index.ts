import { MongoClient } from 'mongodb';

import { Database } from '../lib/types';

const uri = process.env.MONGO_URI;

const dbConnection = async (): Promise<Database> => {
  const client = await MongoClient.connect(uri as string);
  const db = client.db('main');

  return {
    listings: db.collection('test_listing')
  };
};

export default dbConnection;
