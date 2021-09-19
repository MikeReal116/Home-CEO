import { Request } from 'express';
import { IResolvers } from '@graphql-tools/utils';
import { ObjectId } from 'mongodb';

import { Database, Listing, User } from '../../../lib/types';
import { authorize } from '../../../lib/utils/authorize';
import {
  CreateLisitingArgs,
  LisitingsQuery,
  ListingArgs,
  ListingFilter,
  ListingsArgs,
  ListingsData,
  Paginate,
  ReturnBooking
} from './types';
import { Geocode } from '../../../lib/geocode';
import { Cloudinary } from '../../../lib/api/cloudinary';

const checkListingInput = (input: CreateLisitingArgs['input']) => {
  if (input.title.length > 50) {
    throw new Error('Title should not be more than 200 characters');
  }
  if (input.description.length > 400) {
    throw new Error('Description should not be more than 500 characters');
  }
  if (input.price < 0) {
    throw new Error('Price should not be less than 0');
  }
};

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

        const query: LisitingsQuery = {};

        let city = null;
        let admin = null;
        let country = null;

        if (location) {
          const data = await Geocode.geocode(location);
          city = data?.data[0].locality;
          admin = data?.data[0].region;
          country = data?.data[0].country;

          if (city) query.city = city;
          //if (admin) query.admin = admin;
          if (country) {
            query.country = country;
          } else {
            throw new Error('No result found, try a more general search');
          }
        }

        let cursor = await db.listings.find(query);

        listingsData.total = await cursor.count();
        if (location) {
          const cityText = city ? city : '';
          const adminText = admin ? admin : '';
          const countryText = country ? country : '';
          listingsData.search = `Results for '${
            cityText ? cityText + `,` : ''
          } ${adminText ? adminText + `,` : ''} ${countryText}'`;
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
  Mutation: {
    createListing: async (
      _root: undefined,
      { input }: CreateLisitingArgs,
      { db, req }: { db: Database; req: Request }
    ): Promise<Listing | undefined> => {
      try {
        const viewer = await authorize(db, req);

        if (!viewer) {
          throw new Error('You have to be logged in to create a lister');
        }

        if (!viewer.walletId) {
          throw new Error(
            'You have to connect you account to Stripe first before you can create a listing'
          );
        }

        checkListingInput(input);

        const data = await Geocode.geocode(input.address);

        if (
          !data ||
          !data.data[0].name ||
          !data.data[0].region ||
          !data.data[0].locality ||
          !data.data[0].country
        ) {
          throw new Error(
            'Could not find the specific location for this Lisitng, Check the entered location well'
          );
        }

        const city = data.data[0].locality;
        const address = `${data.data[0].name}, ${data.data[0].locality}, ${
          data.data[0].region
        } ${
          data.data[0].postal_code ? ` , ${data.data[0].postal_code}` : null
        }`;
        const admin = data.data[0].region;
        const country = data.data[0].country;

        const image = await Cloudinary.upload(input.image);

        const insertResult = await db.listings.insertOne({
          _id: new ObjectId(),
          host: viewer._id,
          ...input,
          image,
          address,
          city,
          admin,
          country,
          bookings: [],
          bookingsIndex: {}
        });

        const newLisitng = await db.listings.findOne({
          _id: insertResult.insertedId
        });

        if (!newLisitng) {
          throw new Error('Listing could not be created');
        }

        await db.users.updateOne(
          { _id: viewer._id },
          { $push: { listings: newLisitng._id } }
        );
        return newLisitng;
      } catch (error) {
        throw new Error(`Could not query to create Listing: ${error}`);
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
