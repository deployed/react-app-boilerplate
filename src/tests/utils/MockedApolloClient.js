/**
 * This provides a mock Apollo client with schema and mocks needed to render the skeleton of our app
 * in tests. Schema and mocks are defined in graphql-mocks/schema.
 */
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { SchemaLink } from 'apollo-link-schema';
import { addMockFunctionsToSchema } from 'graphql-tools';
import schema, { mocks } from '../graphql-mocks/schema';


addMockFunctionsToSchema({ schema, mocks, preserveResolvers: true });

const apolloCache = new InMemoryCache();

const client = new ApolloClient({
  cache: apolloCache,
  link: new SchemaLink({ schema }),
});

export default client;
