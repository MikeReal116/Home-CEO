import { gql } from '@apollo/client';

export const BookListing = gql`
  mutation BookListing($input: BookingInput!) {
    createBooking(input: $input)
  }
`;
