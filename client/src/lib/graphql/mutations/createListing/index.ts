import { gql } from '@apollo/client';

export const CREATE_LISTING = gql`
  mutation CreateListing($input: ListingInput!) {
    createListing(input: $input) {
      id
    }
  }
`;
