import { gql } from '@apollo/client';

export const GET_LISTNG = gql`
  query GetListing($id: ID!, $limit: Int!, $page: Int!) {
    listing(id: $id) {
      id
      title
      description
      image
      price
      address
      type
      city
      numOfGuests
      bookingsIndex
      authorize
      host {
        id
        avatar
        name
        hasWallet
      }
      bookings(limit: $limit, page: $page) {
        total
        result {
          id
          checkIn
          checkOut
        }
      }
    }
  }
`;
