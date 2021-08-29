/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteListing
// ====================================================

export interface DeleteListing_listing {
  __typename: "Listing";
  id: string;
}

export interface DeleteListing {
  listing: DeleteListing_listing | null;
}

export interface DeleteListingVariables {
  id: string;
}
