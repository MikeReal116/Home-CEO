import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Listing {
    id: ID!
    title: String!
    image: String!
    address: String!
    price: Int!
    numOfBeds: Int!
    numOfGuest: Int!
    numOfBaths: Int!
    rating: Int!
  }
  type Query {
    listings: [Listing!]!
    getListing(id: ID!): Listing
  }
`;
