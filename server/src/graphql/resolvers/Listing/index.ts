import { Request } from 'express';
import { IResolvers } from '@graphql-tools/utils';
import { ObjectId } from 'mongodb';

import { Database, Listing, User } from '../../../lib/types';
import { authorize } from '../../../lib/utils/authorize';
import { ListingArgs, Paginate, ReturnBooking } from './types';

export const listingResolver: IResolvers = {
  Query: {
    listing: async (
      _root: undefined,
      { id }: ListingArgs,
      { db, req }: { db: Database; req: Request }
    ): Promise<Listing | undefined> => {
      try {
        const listing = await db.listings.findOne({ _id: new ObjectId(id) });

        if (!listing) {
          throw new Error('Could not find the listing you requested for');
        }

        const viewer = await authorize(db, req);
        if (viewer && viewer._id === listing.host) {
          listing.authorized = true;
        }

        return listing;
      } catch (error) {
        throw new Error(`Could not query for listing: ${error}`);
      }
    }
  },
  Listing: {
    id: (listing: Listing) => listing._id.toString(),
    host: async (
      listing: Listing,
      _args: Record<string, never>,
      { db }: { db: Database }
    ): Promise<User | undefined> => {
      try {
        const user = await db.users.findOne({ _id: listing.host });
        if (!user) {
          throw new Error('No user found with this id');
        }
        return user;
      } catch (error) {
        throw new Error(`Could not query for user: ${error}`);
      }
    },
    bookingsIndex: (listing: Listing) => {
      return JSON.stringify(listing.bookingsIndex);
    },
    bookings: async (
      listing: Listing,
      { limit, page }: Paginate,
      { db }: { db: Database }
    ): Promise<ReturnBooking | undefined> => {
      try {
        const bookingReturn = {
          total: 0,
          result: []
        };
        if (!listing.authorized) {
          return;
        }
        const bookings = db.bookings.find({
          _id: {
            $in: listing.bookings
          }
        });

        bookingReturn.total = await bookings.count();

        const cursor = bookings
          .skip(page > 0 ? (page - 1) * limit : 0)
          .limit(limit);

        bookingReturn.result = await cursor.toArray();

        return bookingReturn;
      } catch (error) {
        throw new Error(`Could not query for bookings : ${error}`);
      }
    }
  }
};
