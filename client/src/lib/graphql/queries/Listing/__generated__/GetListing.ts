/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ListingType } from './../../../globalTypes';

// ====================================================
// GraphQL query operation: GetListing
// ====================================================

export interface GetListing_listing_host {
  __typename: 'User';
  id: string;
  avatar: string;
  name: string;
  hasWallet: boolean;
}

export interface GetListing_listing_bookings_result {
  __typename: 'Booking';
  id: string;
  checkIn: string;
  checkOut: string;
}

export interface GetListing_listing_bookings {
  __typename: 'Bookings';
  total: number;
  result: GetListing_listing_bookings_result[];
}

export interface GetListing_listing {
  __typename: 'Listing';
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  address: string;
  type: ListingType;
  city: string;
  numOfGuests: number;
  bookingsIndex: string;
  authorize: boolean | null;
  host: GetListing_listing_host;
  bookings: GetListing_listing_bookings | null;
}

export interface GetListing {
  listing: GetListing_listing | null;
}

export interface GetListingVariables {
  id: string;
  limit: number;
  page: number;
}
