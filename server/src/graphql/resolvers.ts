import { ObjectId } from 'mongodb';
import { Database, Listings } from '../lib/types';

export const resolvers = {
  Query: {
    listings: async (
      _root: undefined,
      _args: Record<string, never>,
      { db }: { db: Database }
    ): Promise<Listings[]> => {
      return await db.listings.find({}).toArray();
    }
  },
  Mutation: {
    deleteListing: async (
      _root: undefined,
      { id }: { id: string },
      { db }: { db: Database }
    ): Promise<Listings> => {
      const deleteResult = await db.listings.findOneAndDelete({
        _id: new ObjectId(id)
      });

      if (!deleteResult.value) {
        throw new Error("Delete wasn't successful");
      }
      return deleteResult.value;
    }
  },
  Listing: {
    id: (root: Listings) => root._id.toString()
  }
};
