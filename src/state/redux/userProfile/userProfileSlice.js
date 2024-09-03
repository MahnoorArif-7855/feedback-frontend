import { AUTHORITY, WEB_LOGIN } from '@/common/utils/constant';
import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';

import {
  AuthStateAPI,
  adminDetailsAPI,
  allUsersInfo,
  fetchSlackChannelsAPI,
  fetchUserSlacksChannelsAPI,
  intercomTeamName,
  searchCountAPI,
  searchLimitSpecificUserAPI,
  searchLimitUpdateAPI,
  sendLastActivityAPI,
  sendSlackMessage,
  siginWithSlackAPI,
  slackAutoIngestChannelAPI,
  userTypeUpdateAPI,
} from './userProfileAPI';

const initialState = {
  searchLimitCounts: null,
  authDetails: {
    type: AUTHORITY.USER,
  },
  feedbackInfo: [],
  authLoginLoading: false,
  channelLoading: false,
  allUsers: [],
  UsersInfo: [],
  searchLimitLoader: false,
  organizationInfo: null,
  selectedOrganizationInfo: null,
  authUser: {},
  webLogin: WEB_LOGIN,
  selectedOrganizationId: null,
  slackChannelsInfo: [],
  intercomTeams: [],
  userSlackChannels: [],
  currentSlackChannelOrgId: null,
  userSignInModal: false,
  SlackChannelPagination: '',
  autoIngestChannelNames: [],
};

export const searchLimitsSlice = createAsyncThunk('search/limits', async ({ user }, { dispatch }) => {
  await searchCountAPI({ user, dispatch });
});
export const getAllUsersInfoSlice = createAsyncThunk('search/all-users-details', async ({ user }, { dispatch }) => {
  await allUsersInfo({ user, dispatch });
});

export const adminDetailsSlice = createAsyncThunk('search/users', async ({ user }, { dispatch }) => {
  await adminDetailsAPI({ user, dispatch });
});
export const AuthStateSlice = createAsyncThunk('search/users', async ({ user, router }, { dispatch }) => {
  await AuthStateAPI({ user, router, dispatch });
});
export const searchLimitSpecificUserSlice = createAsyncThunk(
  'search/limits',
  async ({ user, uid, userSearchCount, userLimitEnable }, { dispatch }) => {
    await searchLimitSpecificUserAPI({
      user,
      uid,
      userSearchCount,
      userLimitEnable,
      dispatch,
    });
  }
);

export const userTypeUpdateSlice = createAsyncThunk('user/type', async ({ user, type, uid }, { dispatch }) => {
  await userTypeUpdateAPI({ user, type, uid, dispatch });
});

export const searchLimitUpdateSlice = createAsyncThunk(
  'admin/searchCount',
  async ({ searchCount, searchType, user }, { dispatch }) => {
    await searchLimitUpdateAPI({ user, searchCount, searchType, dispatch });
  }
);

export const sigInWithSlackSlice = createAsyncThunk(
  'admin/slack',
  async ({ params, router, setSlackLoading, webLogin }, { dispatch }) => {
    await siginWithSlackAPI({
      params,
      router,
      webLogin,
      setSlackLoading,
      dispatch,
    });
  }
);

export const fetchUserSlacksChannelsSlice = createAsyncThunk(
  'admin/slack',
  async ({ user, channelsIds, organizationId }, { dispatch }) => {
    await fetchUserSlacksChannelsAPI({
      user,
      channelsIds,
      organizationId,
      dispatch,
    });
  }
);

export const getSlackChannelsSlice = createAsyncThunk(
  'admin/get-slack-channels',
  async ({ organizationId, SlackChannelPagination, user, router }, { dispatch }) => {
    await fetchSlackChannelsAPI({
      router,
      user,
      organizationId,
      SlackChannelPagination,
      dispatch,
    });
  }
);

export const slackAutoIngestChannelSlice = createAsyncThunk(
  'user/get-slack-auto-ingest-channel',
  async ({ channelId, organizationId, user }, { dispatch }) => {
    await slackAutoIngestChannelAPI({
      channelId,
      organizationId,
      user,
      dispatch,
    });
  }
);

export const intercomTeamsNameSlice = createAsyncThunk(
  'user/get-intercom-team-channel',
  async ({ organizationId, user }, { dispatch }) => {
    await intercomTeamName({
      organizationId,
      user,
      dispatch,
    });
  }
);

export const sendSlackMessageSlice = createAsyncThunk('admin/send-slack-message', async ({ user, organizationId }) => {
  await sendSlackMessage({ user, organizationId });
});
export const sendLastActivitySlice = createAsyncThunk('admin/last-activity', async ({ user, lastActivity }) => {
  await sendLastActivityAPI({ user, lastActivity });
});

export const authSlice = createSlice({
  name: 'userProfile',
  initialState,

  reducers: {
    searchLimits: (state, action) => {
      state.searchLimitCounts = action.payload;
    },
    userProfileInfo: (state, action) => {
      state.authDetails = action.payload;
    },
    slackFeedbackInfo: (state, action) => {
      state.feedbackInfo = action.payload;
    },
    usersInfo: (state, action) => {
      state.allUsers = action.payload;
    },
    totalUsers: (state, action) => {
      state.UsersInfo = action.payload;
    },
    organizationDetails: (state, action) => {
      state.organizationInfo = action.payload;
    },
    selectedOrganizationDetails: (state, action) => {
      state.selectedOrganizationInfo = action.payload;
    },
    authUserInfo: (state, action) => {
      state.authUser = action.payload;
    },
    selectOrganizationId: (state, action) => {
      state.selectedOrganizationId = action.payload;
    },
    slackChannels: (state, action) => {
      state.slackChannelsInfo = action.payload;
    },
    autoIngestChannelNamesRedux: (state, { payload }) => {
      const existingChannel = state.autoIngestChannelNames.find((channel) => channel.channelId === payload.channelId);
      if (!existingChannel) {
        state.autoIngestChannelNames = [...state.autoIngestChannelNames, payload];
      }
    },
    intercomTeamNames: (state, { payload }) => {
      state.intercomTeams = payload;
    },
    getSlackChannels: (state, { payload }) => {
      const { organizationChannels, SlackChannelPagination, getSlackChannelOrganizationId } = payload;

      const { currentSlackChannelOrgId } = current(state);

      state.userSlackChannels =
        getSlackChannelOrganizationId === currentSlackChannelOrgId // this is for admin purpose if the admin changed the organization from admin bar
          ? state.userSlackChannels.concat(organizationChannels)
          : organizationChannels;
      state.SlackChannelPagination = SlackChannelPagination;
      state.currentSlackChannelOrgId = getSlackChannelOrganizationId;
    },
    SiginInWithSlack: (state, action) => {
      const { slackSign } = action.payload;
      state.slackSigIn = slackSign;
    },
    SigninModalState: (state, action) => {
      state.userSignInModal = true;
    },
    ChangeModalState: (state, action) => {
      state.userSignInModal = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(sigInWithSlackSlice.pending, (state) => {
        state.authLoginLoading = true;
      })
      .addCase(sigInWithSlackSlice.fulfilled, (state, { payload }) => {
        state.authLoginLoading = false;
      })
      .addCase(getSlackChannelsSlice.pending, (state) => {
        state.channelLoading = true;
      })
      .addCase(getSlackChannelsSlice.fulfilled, (state, { payload }) => {
        state.channelLoading = false;
      });
  },
});

export const {
  searchLimits,
  userProfileInfo,
  slackFeedbackInfo,
  usersInfo,
  totalUsers,
  organizationDetails,
  selectedOrganizationDetails,
  authUserInfo,
  SiginInWithSlack,
  SigninModalState,
  ChangeModalState,
  selectOrganizationId,
  slackChannels,
  getSlackChannels,
  autoIngestChannelNamesRedux,
  intercomTeamNames,
} = authSlice.actions;

export default authSlice.reducer;
