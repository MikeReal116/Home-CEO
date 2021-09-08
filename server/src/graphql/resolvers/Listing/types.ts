import { Booking } from '../../../lib/types';

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
