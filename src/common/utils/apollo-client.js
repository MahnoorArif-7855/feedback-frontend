import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { getServerURL } from './func';

export const endUserClient = (jwtToken) => {
  const httpLink = createHttpLink({
    uri: `${getServerURL()}/graphql`,
  });
  const authLink = setContext((_, { headers }) => {
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,

        authorization: jwtToken ? `Bearer ${jwtToken}` : '',
      },
    };
  });
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
  return client;
};
