import dotenv from 'dotenv';
import { ObjectId } from 'mongodb';
dotenv.config();

import dbConnection from '../src/database';
import { Listings } from '../src/lib/types';

const listingsArray: Listings[] = [
  {
    _id: new ObjectId(),
    title: 'Family home with garden, Oud West',
    image:
      'https://res.cloudinary.com/tiny-house/image/upload/v1560641352/mock/Toronto/toronto-listing-1_exv0tf.jpg',
    address: 'Amsterdam, Noord-Holland 1054, Netherlands',
    price: 100,
    numOfGuests: 2,
    numOfBeds: 1,
    numOfBaths: 2,
    rating: 5
  },
  {
    _id: new ObjectId(),
    title: 'Sunny apartment in Amsterdam city',
    image:
      'https://res.cloudinary.com/tiny-house/image/upload/v1560645376/mock/Los%20Angeles/los-angeles-listing-1_aikhx7.jpg',
    address: 'Amsterdam, NH 1056NX, Netherlands',
    price: 129,
    numOfGuests: 2,
    numOfBeds: 1,
    numOfBaths: 1,
    rating: 4
  },
  {
    _id: new ObjectId(),
    title: 'Romantic house in easy Amsterdam, garden and cats',
    image:
      'https://res.cloudinary.com/tiny-house/image/upload/v1560646219/mock/San%20Fransisco/san-fransisco-listing-1_qzntl4.jpg',
    address: 'Amsterdam, NH 1056, Netherlands',
    price: 200,
    numOfGuests: 3,
    numOfBeds: 2,
    numOfBaths: 2,
    rating: 3
  }
];

const seedData = async () => {
  const { listings } = await dbConnection();
  try {
    console.log('seed data started');
    await listings.insertMany(listingsArray);
    console.log('seed data success');
  } catch (error) {
    throw new Error('seed data failed');
  }
};

seedData();
