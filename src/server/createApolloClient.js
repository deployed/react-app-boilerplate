import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'node-fetch';


const { SERVER_API_URL } = process.env;

if (!SERVER_API_URL) {
  throw new Error('Required environment variable "SERVER_API_URL" is not specified');
}

export default function (req) {
  return new ApolloClient({
    ssrMode: true,
    // Remember that this is the interface the SSR server will use to connect to the
    // API server, so we need to ensure it isn't firewalled, etc
    link: createHttpLink({
      uri: SERVER_API_URL,
      credentials: 'include',
      headers: {
        Cookie: req.header('Cookie'),
        'User-Agent': req.header('User-Agent'),
        Referer: req.header('Referer'),
      },
      fetch,
    }),
    cache: new InMemoryCache(),
  });
}
