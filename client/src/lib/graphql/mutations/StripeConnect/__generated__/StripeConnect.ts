/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { StripeInput } from "./../../../globalTypes";

// ====================================================
// GraphQL mutation operation: StripeConnect
// ====================================================

export interface StripeConnect_stripeConnect {
  __typename: "Viewer";
  hasWallet: boolean | null;
}

export interface StripeConnect {
  stripeConnect: StripeConnect_stripeConnect;
}

export interface StripeConnectVariables {
  input: StripeInput;
}
