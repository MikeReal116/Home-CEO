import merge from 'lodash.merge';
import { bookingResolver } from './Booking';
import { listingResolver } from './Listing';

import { userResolver } from './User';
import { viewerResolvers } from './Viewer';

export const resolvers = merge(
  viewerResolvers,
  userResolver,
  bookingResolver,
  listingResolver
);
