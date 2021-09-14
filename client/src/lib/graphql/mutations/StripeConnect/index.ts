import { gql } from '@apollo/client';

export const STRIPE_CONNECT = gql`
  mutation StripeConnect($input: StripeInput!) {
    stripeConnect(input: $input) {
      hasWallet
    }
  }
`;
