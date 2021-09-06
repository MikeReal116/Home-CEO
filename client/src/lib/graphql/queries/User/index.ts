import { gql } from '@apollo/client';

export const GET_USER = gql`
  query GetUser(
    $id: ID!
    $bookingPage: Int!
    $listingPage: Int!
    $limit: Int!
  ) {
    user(id: $id) {
      id
      name
      avatar
      email
      hasWallet
      income
      bookings(limit: $limit, page: $bookingPage) {
        total
        result {
          id
          checkIn
          checkOut
          listing {
            id
            title
            image
            numOfGuests
            price
            address
          }
        }
      }
      listings(limit: $limit, page: $listingPage) {
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
  }
`;
