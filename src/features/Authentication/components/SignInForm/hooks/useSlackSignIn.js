import { sigInWithSlackSlice } from '@/state/redux/userProfile/userProfileSlice';
import { useRouter } from 'next/router';
import { event } from 'nextjs-google-analytics';
import querystring from 'querystring';
import * as React from 'react';
import { useDispatch } from 'react-redux';

export const useSlackSignIn = () => {
  const router = useRouter();

  const { code, webLogin } = router.query;

  const dispatch = useDispatch();
  const clientId = process.env.SLACK_CLIENT_ID;
  const clientSecret = process.env.SLACK_CLIENT_SECRET;
  const redirectUri = `${window.location.origin}/signin`;

  const [isLoading, setIsLoading] = React.useState(false);
  const [isSigningUp, setIsSigningUp] = React.useState(false);

  const handleSignIn = () => {
    setIsLoading(true);

    const params = {
      client_id: clientId,
      scope: 'openid,email,profile',
      redirect_uri: `${window.location.origin}/signin`,
      response_type: 'code',
    };

    event('signin_with_slack', { params });
    window.location.href = `https://slack.com/openid/connect/authorize?${querystring.stringify(params)}`;
  };

  React.useEffect(() => {
    if (code) {
      setIsSigningUp(true);
      const params = {
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
      };
      (async () => {
        await dispatch(sigInWithSlackSlice({ params, router, setSlackLoading: setIsLoading, webLogin }));
      })();
    }
  }, [code]);

  return {
    handleSignIn,
    isLoading,
    isSigningUp,
  };
};
