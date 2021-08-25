import { Collection, ObjectId } from 'mongodb';

export interface Listings {
  _id: ObjectId;
  title: string;
  image: string;
  address: string;
  price: number;
  numOfBeds: number;
  numOfGuests: number;
  numOfBaths: number;
  rating: number;
}

export interface Database {
  listings: Collection<Listings>;
}
