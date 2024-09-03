import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { deleteUserAccountAPI, disconnectSlackAppAPI, resetData, uninstallSlackAppAPI } from './settingAPI';

const initialState = {
  deletedUser: false,
  feedbacksDetailInfo: null,
  hasGptOutputProperty: false,
};

export const deleteUserAccount = createAsyncThunk(
  'search/limits',
  async ({ user, uid, customerId, organizationId }, { dispatch }) => {
    await deleteUserAccountAPI({
      user,
      uid,
      customerId,
      organizationId,
      dispatch,
    });
  }
);
export const disconnectSlackApp = createAsyncThunk(
  'settings/disconnect-Slack',
  async ({ user, uid, organizationId }, { dispatch }) => {
    await disconnectSlackAppAPI({
      user,
      uid,
      organizationId,
      dispatch,
    });
  }
);

export const uninstallSlackApp = createAsyncThunk(
  'settings/uninstall-Slack',
  async ({ user, uid, organizationId, setIsDataDeleting }, { dispatch }) => {
    await uninstallSlackAppAPI({
      user,
      uid,
      organizationId,
      setIsDataDeleting,
      dispatch,
    });
  }
);
export const resetOrgData = createAsyncThunk(
  'org/reset',
  async ({ organizationId, user, router, setIsDataDeleting }) => {
    await resetData({
      organizationId,
      user,
      router,
      setIsDataDeleting,
    });
  }
);

export const settingSlice = createSlice({
  name: 'userSettings',
  initialState,

  reducers: {
    deleteAccountInfo: (state, action) => {
      state.deletedUser = action.payload;
    },
    feedbacksDetail: (state, action) => {
      const hasGptOutputProperty = action.payload?.length > 0 && action.payload?.every((item) => 'gptOutput' in item);
      state.feedbacksDetailInfo = action.payload;
      state.hasGptOutputProperty = hasGptOutputProperty;
    },
  },

  extraReducers: (builder) => {
    builder;
  },
});

export const { deleteAccountInfo, feedbacksDetail } = settingSlice.actions;

export default settingSlice.reducer;
