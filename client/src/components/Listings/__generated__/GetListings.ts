/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetListings
// ====================================================

export interface GetListings_listings {
  __typename: "Listing";
  id: string;
  title: string;
  image: string;
  address: string;
  price: number;
  numOfBeds: number;
  numOfGuests: number;
  numOfBaths: number;
  rating: number;
}

export interface GetListings {
  listings: GetListings_listings[];
}
