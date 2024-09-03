/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    AUTH_DOMAIN: process.env.AUTH_DOMAIN,
    PROJECT_ID: process.env.PROJECT_ID,
    STRORAGE_BUCKET: process.env.STRORAGE_BUCKET,
    MESSAGE_SENDER_MESSAGE_ID: process.env.MESSAGE_SENDER_MESSAGE_ID,
    APP_ID: process.env.APP_ID,
    MEASUREMENT_ID: process.env.MEASUREMENT_ID,
    DB_URI: process.env.DB_URI,
    SERVER_PROD_URL: process.env.SERVER_PROD_URL,
    SERVER_DEV_URL: process.env.SERVER_DEV_URL,
    NODE_ENV: process.env.production,
    ADD_TO_SLACK_URL: process.env.ADD_TO_SLACK_URL,
    SLACK_CLIENT_ID: process.env.SLACK_CLIENT_ID,
    SLACK_CLIENT_SECRET: process.env.SLACK_CLIENT_SECRET,
    OAUTH_URL: process.env.OAUTH_URL,
    STORE_USER_INFO_API: process.env.STORE_USER_INFO_API,
    GOOGLE_MEASUREMENT_ID: process.env.GOOGLE_MEASUREMENT_ID,
    SLACK_APP_ID: process.env.SLACK_APP_ID,
    AI_API_BASE_URL: process.env.AI_API_BASE_URL,
    HYPERDX_API_KEY: process.env.HYPERDX_API_KEY,
    ALGOLIA_APP_ID: process.env.ALGOLIA_APP_ID,
    ALGOLIA_API_KEY: process.env.ALGOLIA_API_KEY,
    ALGOLIA_INDEX_NAME: process.env.ALGOLIA_INDEX_NAME,
    DEV_SITE: process.env.DEV_SITE,
    DISCOURSE_WEBHOOK_URL: process.env.DISCOURSE_WEBHOOK_URL,
    INTERCOM_APP_ID: process.env.INTERCOM_APP_ID,
    ZENDESK_WEBHOOK_URL: process.env.ZENDESK_WEBHOOK_URL,
    INTERCOM_WEBHOOK_URL: process.env.INTERCOM_WEBHOOK_URL,
    ENCRYPTED_KEY: process.env.ENCRYPTED_KEY,
  },
  experimental: {
    appDir: true,
    disableOptimizedLoading: true,
  },
  compiler: {
    styledComponents: true,
  },
  images: {
    unoptimized: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },

  async rewrites() {
    return [
      {
        source: '/pricing',
        destination: '/price',
      },
      {
        source: '/',
        destination: '/home',
      },
      {
        source: '/signup',
        destination: '/auth/signUp',
      },
      {
        source: '/signin',
        destination: '/auth/login',
      },
      {
        source: '/forgetpassword',
        destination: '/auth/forgetPassword',
      },
      {
        source: '/signinwithslack',
        destination: '/auth/slackLogin',
      },
    ];
  },
};

module.exports = nextConfig;
