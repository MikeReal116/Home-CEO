import { Request } from 'express';
import { IResolvers } from '@graphql-tools/utils';

import { Booking, Database, Listing, User } from '../../../lib/types';
import { authorize } from '../../../lib/utils/authorize';
import { Paginate, ReturnData, UserArgs } from './types';

export const userResolver: IResolvers = {
  Query: {
    user: async (
      _root: undefined,
      { id }: UserArgs,
      { db, req }: { db: Database; req: Request }
    ): Promise<User | null> => {
      try {
        const user = await db.users.findOne({ _id: id });

        if (!user) {
          return null;
        }

        const viewer = await authorize(db, req);

        if (viewer?._id === user._id) {
          user.authorized = true;
        }
        return user;
      } catch (error) {
        throw new Error(`User could not be queried: ${error}`);
      }
    }
  },
  User: {
    id: (user: User) => user._id,
    hasWallet: (user: User) => Boolean(user.walletId),
    income: (user: User) => (user.authorized ? user.income : null),
    bookings: async (
      user: User,
      { limit, page }: Paginate,
      { db }: { db: Database }
    ): Promise<ReturnData<Booking> | null> => {
      try {
        if (!user.authorized) {
          return null;
        }
        const bookingData: ReturnData<Booking> = {
          total: 0,
          result: []
        };

        let cursor = await db.bookings.find({ _id: { $in: user.bookings } });
        bookingData.total = await cursor.count();

        cursor = cursor.skip(page < 0 ? (page - 1) * limit : 0).limit(limit);
        bookingData.result = await cursor.toArray();

        return bookingData;
      } catch (error) {
        throw new Error(`Bookings could not be queried: ${error}`);
      }
    },
    listings: async (
      user: User,
      { limit, page }: Paginate,
      { db }: { db: Database }
    ): Promise<ReturnData<Listing>> => {
      try {
        const listingData: ReturnData<Listing> = {
          total: 0,
          result: []
        };

        let cursor = await db.listings.find({ _id: { $in: user.listings } });
        listingData.total = await cursor.count();

        cursor = cursor.skip(page > 0 ? (page - 1) * limit : 0).limit(limit);
        listingData.result = await cursor.toArray();

        return listingData;
      } catch (error) {
        throw new Error(`Listings could not be queried: ${error}`);
      }
    }
  }
};
