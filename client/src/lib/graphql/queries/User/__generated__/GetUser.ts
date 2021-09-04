/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUser
// ====================================================

export interface GetUser_user_bookings_result_listing {
  __typename: "Listing";
  id: string;
  title: string;
  image: string;
  numOfGuests: number;
  price: number;
  address: string;
}

export interface GetUser_user_bookings_result {
  __typename: "Booking";
  id: string;
  checkIn: string;
  checkOut: string;
  listing: GetUser_user_bookings_result_listing;
}

export interface GetUser_user_bookings {
  __typename: "Bookings";
  total: number;
  result: GetUser_user_bookings_result[];
}

export interface GetUser_user_listings_result {
  __typename: "Listing";
  id: string;
  title: string;
  image: string;
  numOfGuests: number;
  price: number;
  address: string;
}

export interface GetUser_user_listings {
  __typename: "Listings";
  total: number;
  result: GetUser_user_listings_result[];
}

export interface GetUser_user {
  __typename: "User";
  id: string;
  name: string;
  avatar: string;
  email: string;
  hasWallet: boolean;
  income: number | null;
  bookings: GetUser_user_bookings | null;
  listings: GetUser_user_listings;
}

export interface GetUser {
  user: GetUser_user | null;
}

export interface GetUserVariables {
  id: string;
  bookingPage: number;
  listingPage: number;
  limit: number;
}
