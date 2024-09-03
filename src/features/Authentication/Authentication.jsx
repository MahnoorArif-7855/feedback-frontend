import { getServerURL } from '@/common/utils/func';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import React from 'react';

import SignInForm from './components/SignInForm';

const Login = () => {
  const errorLink = onError(({ graphqlErrors }) => {
    if (graphqlErrors) {
      graphqlErrors.map(({ message }) => {
        alert(`Graphql error ${message}`);
      });
    }
  });
  const link = from([errorLink, new HttpLink({ uri: `${getServerURL()}/graphql` })]);

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: link,
  });
  return (
    <ApolloProvider client={client}>
      <SignInForm />
    </ApolloProvider>
  );
};

export default Login;
