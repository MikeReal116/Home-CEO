import { Collection, ObjectId } from 'mongodb';

export interface BookingIndexDay {
  [key: string]: boolean;
}
export interface BookingIndexMonth {
  [key: string]: BookingIndexDay;
}
export interface BookingIndexYear {
  [key: string]: BookingIndexMonth;
}
export enum ListingType {
  Apartment = 'APARTMENT',
  House = 'HOUSE'
}

export interface Listing {
  _id: ObjectId;
  title: string;
  description: string;
  image: string;
  price: number;
  host: string;
  address: string;
  type: ListingType;
  city: string;
  country: string;
  admin: string;
  numOfGuests: number;
  bookings: ObjectId[];
  bookingsIndex: BookingIndexYear;
}

export interface User {
  _id: string;
  name: string;
  avatar: string;
  token: string;
  email: string;
  income: number;
  walletId?: string;
  bookings: ObjectId[];
  listings: ObjectId[];
}
export interface Booking {
  _id: ObjectId;
  tenant: string;
  listing: ObjectId;
  checkIn: string;
  checkOut: string;
}

export interface Database {
  listings: Collection<Listing>;
  users: Collection<User>;
  bookings: Collection<Booking>;
}
