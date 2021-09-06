import { IResolvers } from '@graphql-tools/utils';

import { Booking, Database, Listing } from '../../../lib/types';

export const bookingResolver: IResolvers = {
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
