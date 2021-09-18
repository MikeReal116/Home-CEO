import { Request } from 'express';
import { IResolvers } from '@graphql-tools/utils';
import { ObjectId } from 'mongodb';
import moment, { Moment } from 'moment';

import { Booking, Database, Listing } from '../../../lib/types';
import { authorize } from '../../../lib/utils/authorize';
import { BookingIndexYear, CreateBookingArgs } from './types';
import { StripeConnect } from '../../../lib/api/stripe';

const checkBookingIndex = (
  checkIn: Moment,
  checkOut: Moment,
  bookingsIndex: BookingIndexYear
) => {
  const newBookingIndex = { ...bookingsIndex };
  let checkInCursor = moment(checkIn, 'YYYY/MM/DD');

  while (checkOut.diff(checkInCursor, 'days') >= 0) {
    const year = checkInCursor.format('YYYY');
    const month = checkInCursor.format('MM');
    const day = checkInCursor.format('DD');

    if (!newBookingIndex[year]) {
      newBookingIndex[year] = {};
    }
    if (!newBookingIndex[year][month]) {
      newBookingIndex[year][month] = {};
    }
    if (!newBookingIndex[year][month][day]) {
      newBookingIndex[year][month][day] = true;
    } else {
      throw new Error('You can not book a date that has already been booked');
    }

    checkInCursor = checkInCursor.add(1, 'days');
  }

  return newBookingIndex;
};

export const bookingResolver: IResolvers = {
  Mutation: {
    createBooking: async (
      _root: undefined,
      { input }: CreateBookingArgs,
      { db, req }: { db: Database; req: Request }
    ): Promise<string | undefined> => {
      const { listing, checkIn, checkOut, source } = input;
      try {
        const viewer = await authorize(db, req);
        if (!viewer) {
          throw new Error('You must me logged in to make bookings');
        }

        const listingDoc = await db.listings.findOne({
          _id: new ObjectId(listing)
        });

        if (!listingDoc) {
          throw new Error('Listing can be found');
        }

        if (viewer._id === listingDoc?.host) {
          throw new Error("You can't book your own listing");
        }

        const host = await db.users.findOne({ _id: listingDoc.host });

        if (!host) {
          throw new Error('Host of this listing can not be found');
        }
        if (!host.walletId) {
          throw new Error('Host of this listing has disconnected from Stripe');
        }

        if (
          moment(checkOut, 'YYYY/MM/DD').diff(
            moment(checkIn, 'YYYY/MM/DD'),
            'days'
          ) <= 0
        ) {
          throw new Error(
            'You have to choose a checkout date that is after the checkin date'
          );
        }

        const newBookingIndex = checkBookingIndex(
          moment(checkIn, 'YYYY/MM/DD'),
          moment(checkOut, 'YYYY/MM/DD'),
          listingDoc.bookingsIndex
        );

        const days = moment(checkOut, 'YYYY/MM/DD').diff(
          moment(checkIn, 'YYYY/MM/DD'),
          'days'
        );

        const totalPrice = (days + 1) * listingDoc.price;

        await StripeConnect.charge(totalPrice, host.walletId, source);

        const newBooking = await db.bookings.insertOne({
          _id: new ObjectId(),
          tenant: viewer._id,
          checkIn,
          checkOut,
          listing: new ObjectId(listingDoc._id)
        });

        await db.users.updateOne(
          { _id: viewer._id },
          {
            $inc: { income: totalPrice },
            $push: { bookings: newBooking.insertedId }
          }
        );

        await db.listings.updateOne(
          { _id: listingDoc._id },
          { $set: { bookingsIndex: newBookingIndex } }
        );
        return newBooking.insertedId.toHexString();
      } catch (error) {
        throw new Error(`Could not create new Booking: ${error}`);
      }
    }
  },
  Booking: {
    id: (booking: Booking) => booking._id.toString(),
    listing: async (
      booking: Booking,
      {},
      { db }: { db: Database }
    ): Promise<Listing | undefined> => {
      try {
        const listing = await db.listings.findOne({ _id: booking.listing });

        return listing;
      } catch (error) {
        throw new Error('Could not query for bookings');
      }
    }
  }
};
