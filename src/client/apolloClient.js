import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';


const client = new ApolloClient({
  // API_URL is provided by webpack
  // it is either '/graphql/` or environment variable CLIENT_API_URL
  link: new HttpLink({ uri: window.env.CLIENT_API_URL || '/graphql/', credentials: 'include' }),
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__), // eslint-disable-line no-underscore-dangle
});

export default client;
