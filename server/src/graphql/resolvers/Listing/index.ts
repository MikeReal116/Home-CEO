import { IResolvers } from '@graphql-tools/utils';

import { Listing } from '../../../lib/types';

export const listingResolver: IResolvers = {
  Listing: {
    id: (listing: Listing) => listing._id.toString()
  }
};
