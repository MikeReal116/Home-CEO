import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  input LogInInput {
    code: String!
  }
  input StripeInput {
    code: String!
  }

  input ListingInput {
    title: String!
    description: String!
    image: String!
    price: Int!
    type: ListingType!
    address: String!
    numOfGuests: Int!
  }

  enum ListingType {
    APARTMENT
    HOUSE
  }

  enum ListingFilter {
    PRICE_HIGH_TO_LOW
    PRICE_LOW_TO_HIGH
  }

  type Booking {
    id: ID!
    tenant: User!
    listing: Listing!
    checkIn: String!
    checkOut: String!
  }

  type Listing {
    id: ID!
    title: String!
    description: String!
    image: String!
    price: Int!
    host: User!
    address: String!
    type: ListingType!
    city: String!
    numOfGuests: Int!
    bookings(limit: Int, page: Int): Bookings
    bookingsIndex: String!
    authorize: Boolean
  }

  type Bookings {
    total: Int!
    result: [Booking!]!
  }
  type Listings {
    search: String
    total: Int!
    result: [Listing!]!
  }

  type User {
    id: ID!
    name: String!
    avatar: String!
    email: String!
    hasWallet: Boolean!
    income: Int
    bookings(limit: Int, page: Int): Bookings
    listings(limit: Int, page: Int): Listings!
    authorize: Boolean
  }

  type Viewer {
    id: ID
    token: String
    avatar: String
    hasWallet: Boolean
    didRequest: Boolean!
  }

  type Query {
    authUrl: String!
    user(id: ID!): User
    listing(id: ID!): Listing
    listings(
      location: String
      filter: ListingFilter!
      limit: Int!
      page: Int!
    ): Listings
  }
  type Mutation {
    logIn(input: LogInInput): Viewer!
    logOut: Viewer!
    stripeConnect(input: StripeInput!): Viewer!
    stripeDisconnect: Viewer!
    createListing(input: ListingInput!): Listing!
  }
`;
