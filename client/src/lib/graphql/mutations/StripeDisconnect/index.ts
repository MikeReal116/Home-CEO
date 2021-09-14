import { gql } from '@apollo/client';

export const STRIPE_DISCONNECT = gql`
  mutation stripeDisconnect {
    stripeDisconnect {
      hasWallet
    }
  }
`;
