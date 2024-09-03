import loginImage from '@/../public/images/login.gif';
import logo from '@/../public/images/logo-color.svg';
import { Spin } from 'antd';
import { Button } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { SlackIcon } from '../SlackIcon';
import { useSlackSignIn } from './hooks/useSlackSignIn';
import { ContentWrapper, Footer, FormWrapper, ImageWrapper, LegalText, Wrapper } from './styled';

const SignInForm = () => {
  const { handleSignIn, isLoading: slackLoading, isSigningUp } = useSlackSignIn();

  if (isSigningUp) {
    return (
      <Wrapper
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Spin spinning />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <ContentWrapper>
        <Link href='/'>
          <Image alt='Feedback Sync' src={logo} width={160} />
        </Link>
        <FormWrapper>
          <h1>Sign in or create a new account</h1>
          <Button
            size='large'
            onClick={handleSignIn}
            icon={<SlackIcon />}
            loading={slackLoading}
            style={{
              backgroundColor: '#f8f9fa',
              width: '100%',
              display: 'flex',
              gap: 8,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            Continue with Slack
          </Button>
          <LegalText>Google and Email sign in options are coming soon.</LegalText>
        </FormWrapper>
        <Footer>
          <LegalText>
            You will agree to our <Link href='/terms-conditions'>Terms & Conditions</Link> and{' '}
            <Link href='/privacy-policy'>Privacy Policy</Link> by signing up.
          </LegalText>
          <LegalText>&copy; 2024 Feedback Sync LLC.</LegalText>
        </Footer>
      </ContentWrapper>
      <ImageWrapper>
        <Image src={loginImage} width='100%' alt='banner image' draggable='false' />
      </ImageWrapper>
    </Wrapper>
  );
};

export default SignInForm;
