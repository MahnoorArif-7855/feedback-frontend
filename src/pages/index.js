import { LandingPage } from '@/features/StaticPages/LandingPage/LandingPage';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Feedback Sync</title>
        <meta name='description' content='Feedback Sync' />
        <meta name='keywords' content='churn analysis, churn management, preventing customer' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.png' />
      </Head>

      <LandingPage />
    </>
  );
}
