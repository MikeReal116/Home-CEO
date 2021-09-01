import { gql } from '@apollo/client';

export const GET_AUTH_URL = gql`
  query AuthUrl {
    authUrl
  }
`;
