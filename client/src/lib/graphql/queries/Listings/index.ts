import { gql } from '@apollo/client';

export const LISTINGS = gql`
  query Listing($filter: ListingFilter!, $limit: Int!, $page: Int!) {
    listings(filter: $filter, limit: $limit, page: $page) {
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
