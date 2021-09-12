import { Booking, Listing } from '../../../lib/types';

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
}

export interface ListingsData {
  total: number;
  result: Listing[];
}
