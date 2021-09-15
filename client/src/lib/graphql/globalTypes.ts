/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum ListingFilter {
  PRICE_HIGH_TO_LOW = "PRICE_HIGH_TO_LOW",
  PRICE_LOW_TO_HIGH = "PRICE_LOW_TO_HIGH",
}

export enum ListingType {
  APARTMENT = "APARTMENT",
  HOUSE = "HOUSE",
}

export interface ListingInput {
  title: string;
  description: string;
  image: string;
  price: number;
  type: ListingType;
  address: string;
  numOfGuests: number;
}

export interface LogInInput {
  code: string;
}

export interface StripeInput {
  code: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
