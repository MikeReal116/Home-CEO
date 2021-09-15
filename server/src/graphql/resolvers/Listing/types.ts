import { Booking, Listing, ListingType } from '../../../lib/types';

export interface ListingArgs {
  id: string;
}

export interface Paginate {
  limit: number;
  page: number;
}

export interface ReturnBooking {
  total: number;
  result: Booking[];
}

export enum ListingFilter {
  PRICE_HIGH_TO_LOW = 'PRICE_HIGH_TO_LOW',
  PRICE_LOW_TO_HIGH = 'PRICE_LOW_TO_HIGH'
}

export interface ListingsArgs {
  filter: ListingFilter;
  limit: number;
  page: number;
  location?: string;
}

export interface ListingsData {
  search: string | null;
  total: number;
  result: Listing[];
}

export interface LisitingsQuery {
  city?: string | null;
  admin?: string | null;
  country?: string | null;
}

export interface CreateLisitingArgs {
  input: {
    title: string;
    description: string;
    image: string;
    price: number;
    type: ListingType;
    address: string;
    numOfGuests: number;
  };
}
