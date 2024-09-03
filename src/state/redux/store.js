import { configureStore } from '@reduxjs/toolkit';

import billingReducer from './billing/billingSlice';
import integrationReducer from './integration/integrationSlice';
import searchReducer from './searchAI/searchSlice';
import settingsReducer from './settings/settingSlice';
import authReducer from './userProfile/userProfileSlice';

export function makeStore() {
  return configureStore({
    reducer: {
      auth: authReducer,
      billing: billingReducer,
      search: searchReducer,
      settings: settingsReducer,
      integration: integrationReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  });
}

const store = makeStore();

export default store;
