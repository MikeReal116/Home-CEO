/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ListingInput } from "./../../../globalTypes";

// ====================================================
// GraphQL mutation operation: CreateListing
// ====================================================

export interface CreateListing_createListing {
  __typename: "Listing";
  id: string;
}

export interface CreateListing {
  createListing: CreateListing_createListing;
}

export interface CreateListingVariables {
  input: ListingInput;
}
