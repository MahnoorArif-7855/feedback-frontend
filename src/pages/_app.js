import '@/common/styles/globals.css';
import ProtectedRoute from '@/common/ui/ProtectedRoute';
import AppLayout from '@/common/ui/layout';
import { getServerURL } from '@/common/utils/func';
import store from '@/state/redux/store';
import { theme } from '@/theme/theme';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import HyperDX from '@hyperdx/browser';
import Intercom from '@intercom/messenger-js-sdk';
import { ConfigProvider } from 'antd';
import Script from 'next/script';
import { GoogleAnalytics } from 'nextjs-google-analytics';
import nookies from 'nookies';
import { useState } from 'react';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import ReactGA from 'react-ga4';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import { firebaseAuth } from '../../firebase';

export default function App({ Component, pageProps: { ...pageProps } }) {
  const [user] = useAuthState(firebaseAuth);
  const [accessToken, setAccessToken] = useState(null);
  const errorLink = onError(({ graphqlErrors }) => {
    if (graphqlErrors) {
      graphqlErrors.map(({ message, location, path }) => {
        alert(`Graphql error ${message}`);
      });
    }
  });

  const serverUrl = process.env.NODE_ENV === 'development' ? process.env.SERVER_DEV_URL : process.env.SERVER_PROD_URL;

  const shouldShowZendesk = process.env.NODE_ENV !== 'development';

  if (process.env.NODE_ENV !== 'development' && process.env.DEV_SITE !== 'true') {
    HyperDX.init({
      apiKey: process.env.HYPERDX_API_KEY,
      service: 'FeedbackSyncFrontend',
      tracePropagationTargets: serverUrl, // Set to link traces from frontend to backend requests
      consoleCapture: true, // Capture console logs (default false)
      advancedNetworkCapture: true, // Capture full HTTP request/response headers and bodies (default false)
    });
    HyperDX.enableAdvancedNetworkCapture();
  }

  useEffect(() => {
    ReactGA.initialize([
      {
        trackingId: process.env.GOOGLE_MEASUREMENT_ID,
      },
    ]);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const token = await user?.getIdToken(/* forceRefresh */ true);
          // Include the token in the request header
          if (!token) return;
          localStorage.setItem('token', token);
          nookies.set(undefined, 'token', token, { path: '/' });
          setAccessToken(token);
          ReactGA.gtag('set', 'user_properties', {
            user_userId: user.uid,
          });
          ReactGA.gtag('set', 'user_properties', {
            user_id: user.uid,
          });
        } catch (error) {
          console.log('Error retrieving ID token:', error);
        }
      }
    };

    fetchData();
  }, [user]);

  let tokenvalue = accessToken;
  if (typeof window !== 'undefined') {
    tokenvalue = accessToken === null ? localStorage.getItem('token') : accessToken;
  }

  const authorizationData = accessToken !== null ? `Bearer ${tokenvalue}` : 'public';

  const link = from([
    errorLink,
    new HttpLink({
      uri: `${getServerURL()}/graphql`,
      headers: {
        authorization: authorizationData, // Replace YOUR_BEARER_TOKEN with the actual bearer token value`,
      },
    }),
  ]);

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: link,
  });
  return (
    <>
      <GoogleAnalytics gaMeasurementId={process.env.GOOGLE_MEASUREMENT_ID} trackPageViews />
      {shouldShowZendesk && (
        <Script
          id='ze-snippet'
          src='https://static.zdassets.com/ekr/snippet.js?key=da6a1530-2e71-4f75-a018-cb34f8dab401'
        />
      )}
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <ConfigProvider theme={theme}>
            <ApolloProvider client={client}>
              <ProtectedRoute>
                <AppLayout>
                  <Component {...pageProps} />
                </AppLayout>
              </ProtectedRoute>
            </ApolloProvider>
          </ConfigProvider>
        </ThemeProvider>
      </Provider>
    </>
  );
}
