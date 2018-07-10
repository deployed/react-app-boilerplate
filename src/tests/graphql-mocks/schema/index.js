/**
 * Graphql schema mock https://www.apollographql.com/docs/graphql-tools/mocking.html
 */

import { makeExecutableSchema } from 'graphql-tools';

import {
  typeDefs as typeDefsUser,
  users,
} from './user';


// Fill this in with the schema string
const typeDefs = `
  ${typeDefsUser}

  # the schema allows the following query:
  type Query {
    user(token: String): User,
  }

  type Mutation {
    sessionVerify: SessionVerify,
  }
`;

const resolvers = {
  Query: {
    // query: function
  },
  Mutation: {
    // mutation: function
    sessionVerify: () => users[0],
  },
};

export const mocks = {
  Query: () => (resolvers.Query),
  Mutation: () => (resolvers.Mutation),
};

// Make a GraphQL schema with no resolvers
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
