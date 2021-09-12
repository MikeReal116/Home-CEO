import { Request } from 'express';
import { IResolvers } from '@graphql-tools/utils';
import { ObjectId } from 'mongodb';

import { Database, Listing, User } from '../../../lib/types';
import { authorize } from '../../../lib/utils/authorize';
import {
  ListingArgs,
  ListingFilter,
  ListingsArgs,
  ListingsData,
  Paginate,
  ReturnBooking
} from './types';

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
    },
    listings: async (
      _root: undefined,
      { filter, limit, page, location }: ListingsArgs,
      { db }: { db: Database }
    ): Promise<ListingsData | undefined> => {
      try {
        const listingsData: ListingsData = {
          result: [],
          search: null,
          total: 0
        };

        let query = {};

        if (location) {
          query = {
            $or: [
              { country: { $regex: location, $options: 'i' } },
              { city: { $regex: location, $options: 'i' } },
              { admin: { $regex: location, $options: 'i' } }
            ]
          };
        }

        let cursor = await db.listings.find(query);

        listingsData.total = await cursor.count();
        if (location && listingsData.total > 0) {
          listingsData.search = `Results for '${location}'`;
        }

        if (filter === ListingFilter.PRICE_HIGH_TO_LOW) {
          cursor = cursor.sort({ price: -1 });
        }
        if (filter === ListingFilter.PRICE_LOW_TO_HIGH) {
          cursor = cursor.sort({ price: 1 });
        }

        cursor = cursor.skip(page > 0 ? (page - 1) * limit : 0).limit(limit);
        listingsData.result = await cursor.toArray();

        return listingsData;
      } catch (error) {
        throw new Error(`Could not query for listings: ${error}`);
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
        const bookingReturn: ReturnBooking = {
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
