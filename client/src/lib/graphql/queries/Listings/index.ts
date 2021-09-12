import { gql } from '@apollo/client';

export const LISTINGS = gql`
  query Listing(
    $location: String
    $filter: ListingFilter!
    $limit: Int!
    $page: Int!
  ) {
    listings(location: $location, filter: $filter, limit: $limit, page: $page) {
      search
      total
      result {
        id
        title
        image
        numOfGuests
        price
        address
      }
    }
  }
`;
