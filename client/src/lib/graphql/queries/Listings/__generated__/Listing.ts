/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ListingFilter } from "./../../../globalTypes";

// ====================================================
// GraphQL query operation: Listing
// ====================================================

export interface Listing_listings_result {
  __typename: "Listing";
  id: string;
  title: string;
  image: string;
  numOfGuests: number;
  price: number;
  address: string;
}

export interface Listing_listings {
  __typename: "Listings";
  search: string | null;
  total: number;
  result: Listing_listings_result[];
}

export interface Listing {
  listings: Listing_listings | null;
}

export interface ListingVariables {
  location?: string | null;
  filter: ListingFilter;
  limit: number;
  page: number;
}
