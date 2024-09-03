import { getServerURL } from '@/common/utils/func';
import { ApolloClient, HttpLink, InMemoryCache, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { SchemaLink } from '@apollo/client/link/schema';
// import { schema } from '../apollo/schema'
import merge from 'deepmerge';
import { useMemo } from 'react';

let apolloClient;

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`Graphql error ${message}`);
    });
  }
});

function createApolloClient() {
  const authorizationData =
    typeof window !== 'undefined'
      ? localStorage.getItem('token') !== null
        ? `Bearer ${localStorage.getItem('token')}`
        : 'public'
      : 'public';

  const link = from([
    errorLink,
    new HttpLink({
      uri: `${getServerURL()}/graphql`,
      headers: {
        authorization: authorizationData,
      },
    }),
  ]);

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: link,
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache);

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
