//SIGN FORM CONTENT
export const WRONG_PASSWORD_AUTH_MESSAGE = 'auth/wrong-password';
export const WRONG_PASSWORD = 'Wrong Password';
export const USER_NOT_FOUND_AUTH_MESSAGE = 'auth/user-not-found';
export const USER_NOT_FOUND = 'user not found';

export const GOOGLE_AUTH = 'auth/popup-closed-by-user';
export const User_POP_UP_CLOSED = 'User has cancelled the authentication request';

//SIGNUP FORM CONTENT

export const WEAK_PASSWORD = 'auth/weak-password';
export const WEAK_PASSWORD_MESSAGE = 'Password should be at least 6 characters';
export const EMAIL_ALREADY_USE = 'auth/email-already-in-use';
export const EMAIL_ALREADY_USE_MESSAGE = 'Email already in use';

// FORGETPASSWORD CONTENT

export const EMAIL_FOR_PASSWORD_RESET_TITLE = 'Email for resetting password has been sent to your email address';
export const EMAIL_FOR_PASSWORD_RESET_DESCRIPTION = 'Please check your email.';
export const EMAIL_FOR_PASSWORD_RESET_ERROR = 'auth/user-not-found';
export const EMAIL_FOR_PASSWORD_WRONG_EMAIL = (email) => {
  return `This ${email} is not registered . Please provide correct email address.`;
};

// Dashboard

export const dashboardMenuinfo = (text) => {
  return text;
};

export const timeInSeconds = (date) => {
  return new Date(date).toDateString();
};

export const percentage = (partialValue, totalValue) => {
  return (100 * partialValue) / totalValue;
};

// INTEGRATION PAGE
export const SUCCESSFULLY_SAVE_TICKETS_DESCRIPTION = 'ZenDesks Tickets Save in DB Successfully';

export const SUCCESSFULLY_SAVE_TICKETS_TITLE = 'success';
export const ERROR_TITLE = 'Error';

export const ERROR_MESSAGE_AUTHICATION = 'Failed to authorization code SignIn Again';

export const ACTIVE_PLAN = ['active', 'expiring_soon', 'trialing'];
export const PLAN_ACTIVE = 'active';
export const PLAN_TRIALING = 'trialing';
export const EXPIRING_SOON = 'expiring_soon';
export const ADMIN_SUCCESS_MESSAGE = 'User Type change Successfully';

export const ADMIN_SEARCH_COUNT_SUCCESS_MESSAGE = 'Search limit update successfully';

export const G2_SUCCESS_MESSAGE = 'G2 Review Data save in DB Successfully';

export const No_G2_DATA_SUCCESS_MESSAGE = 'G2 have no more reviews to save in db';
export const No_G2_DATA = 'This Product have no review yet';

export const CREATE_TICKET_SUCCESS_MESSAGE = 'Send message successfully';

export const AUTHORITY = {
  ADMIN: 'admin',
  USER: 'user',
  MANAGER: 'manager',
};

export const AI_CHAT_INPUT = 'ai_chat_input';
export const AI_CHAT_OUTPUT = 'ai_chat_output';
export const SLACK_BUTTON_INTEGRATION = 'slack-button-integration';
export const PREMIUM_PLAN = 'premium';
export const FREE_ID = 'free';
export const SUBSCRIPTION_PLAN_TITLE = 'Premium';

export const MOST_POPULAR_PLAN = 'MOST POPULAR';

// Button Text

export const CURRENT_PLAN = 'Current Plan';
export const UPGRADE_PLAN = 'Upgrade Plan';
export const CONTACT_US = 'Contact Us';

export const CURRENT_PLAN_STATUS_ACTIVE = 'Downgrade';
export const CURRENT_PLAN_STATUS_ACTIVE_FOR_BILLING_PAGE = 'Get Feedback sync free';
export const UPGRADE_PLAN_STATUS_ACTIVE = 'Active Plan';
export const UPGRADE_PLAN_STATUS_FOR_BILLING_PAGE = 'Start trial';

export const UPGRADE_PLAN_STATUS_CANCELED = 'Upgrade';

export const UPGRADE_PLAN_STATUS_EXPIRE = 'Expiring at the period end ';
export const EXPIRE_MESSAGE = 'Your Subscription will expire soon ';

export const USER_SEARCH_LIMIT_ENABLE = 'Enable';
export const USER_SEARCH_LIMIT_NOT_ENABLE = 'Not Enable';

export const ACCOUNT_DELETE = 'Account will be permanently deleted.';
export const DISCONNECT_SLACK_APP = 'Slack App will be disconnected from the web application.';
export const UNINSTALL_SLACK_APP_TEXT = 'The Slack app will be permanently uninstalled.';

export const RESET_DATA_TEXT = 'The data will be permanently deleted.';

export const DELETED_ACCOUNT_TITLE = (displayName) => {
  return `Are you sure delete ${displayName} account?`; // notifcation description when assign usage limit exceed
};
export const DISCONNECT_SLACK_FROM_WEBAPP = () => {
  return `Are you sure you want to disconnect the Slack app from your web app?`; // notifcation description when assign usage limit exceed
};
export const UNINSTALL_SLACK_APP = () => {
  return `Are you sure you want to uninstall the Slack app?`;
};

export const DELETE_FEEDBACK = `Are you sure delete feedback?`;
export const FEEDBACK_DELETE = `Feedback will permanently delete`;

export const RESET_DATA = (orgName) => {
  return `Are you sure delete ${orgName} data?`; // notifcation description when assign usage limit exceed
};

export const WEB_LOGIN = 'true';
export const SIGN_IN_REDIRECT_LINK = '/dashboard';
export const SIGN_OUT_REDIRECT_LINK = '/signin';

export const ADMIN_EMAIL = ['talalsiddiqui21@gmail.com', 'safee.azeem@gmail.com', 'patrick.philbin@gmail.com'];

export const US_DATE_FORMAT = 'MM-DD-YYYY';
export const BACKEND_DATE_FORMAT = 'YYYY-MM-DD';

export const USER_LAST_ACTIVITY_SUMMARY = {
  DASHBOARD: 'Dashboard - Past Week - Trending Topics Analysis.',
  LIBRARY_FIND_FEEDBACK: 'Library - Find Feedback',
  LIBRARY_SEARCH_FEEDBACK: 'Library - Search Feedback',
  ANALYSIS: 'Analysis - Fetch Analysis',
  UPLOAD_FEEDBACK: 'Upload Feedback - via web/slack/g2/zendesk',
  UPLOAD_FEEDBACK_WEB: 'Upload Feedback - via web',
};

export const SOURCES = {
  SLACK: 'slack',
  G2: 'g2',
  SLACK_AUTO_INGEST: 'slack-auto-ingest',
  DISCOURSE: 'discourse',
  ZENDESK: 'zendesk',
  WEB: 'web',
  CSV: 'csv',
  INTERCOM: 'intercom',
};

export const feedbackSources = [
  { label: 'Slack', value: 'slack' },
  { label: 'G2', value: 'g2' },
  { label: 'Zendesk', value: 'zendesk' },
  { label: 'Slack auto ingest', value: 'slack-auto-ingest' },
  { label: 'Discourse', value: 'discourse' },
  { label: 'Web', value: 'web' },
  { label: 'CSV', value: 'csv' },
  { label: 'Intercom', value: 'intercom' },
];

export const ZENDESK_TABS = {
  TICKET: 'ticket',
  WEBHOOK: 'webhook',
};

export const SLACK_CHANNEL_ERROR_MESSAGE = {
  MISSING_SCOPE: 'An API error occurred: missing_scope',
};
