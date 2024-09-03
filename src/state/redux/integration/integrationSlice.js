import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  G2ReviewsAPI,
  createZendeskTicketAPI,
  discourseSecretAPI,
  intercomAPI,
  zendeskAPI,
  zendeskDomainAPI,
  zendeskSaveSecretKeyAPI,
} from './integrationAPI';

const initialState = {
  G2Reviews: null,
  zendeskdata: null,
  discourseButtonVisible: true,
  discourseSecretKey: null,
  DiscourseURL: null,
  zendeskButtonVisible: true,
  zendeskSecretKey: null,
  zendeskURL: null,
  intercomButtonVisible: true,
  intercomURL: null,
  intercomLoader: false,
  intercomDisableButton: true,
};

export const G2ReviewSlice = createAsyncThunk(
  'g2/Info',
  async ({ user, slugValue, organizationId, setG2Loader }, { dispatch }) => {
    await G2ReviewsAPI({
      user,
      slugValue,
      organizationId,
      setG2Loader,
      dispatch,
    });
  }
);
export const discourseSecretSlice = createAsyncThunk(
  'discourse/Info',
  async ({ user, secretKey, organizationId }, { dispatch }) => {
    await discourseSecretAPI({
      user,
      secretKey,
      organizationId,
      dispatch,
    });
  }
);
export const zendeskSaveSecretKeySlice = createAsyncThunk(
  'zendesk/secret-key',
  async ({ user, secretKey, organizationId }, { dispatch }) => {
    await zendeskSaveSecretKeyAPI({
      user,
      secretKey,
      organizationId,
      dispatch,
    });
  }
);
export const zendeskSaveDomainSlice = createAsyncThunk(
  'zendesk/domain',
  async ({ user, zendeskInfo, organizationId, setZendeskDomainLoading }, { dispatch }) => {
    await zendeskDomainAPI({
      user,
      zendeskInfo,
      organizationId,
      setZendeskDomainLoading,
      dispatch,
    });
  }
);

export const zendeskSlice = createAsyncThunk('userProfile/Info', async ({ user, data }, { dispatch }) => {
  await zendeskAPI({ user, data, dispatch });
});

export const createZendeskTicketSlice = createAsyncThunk(
  'userProfile/Info',
  async ({ name, message, email, setContactLoader }, { dispatch }) => {
    await createZendeskTicketAPI({
      setContactLoader,
      name,
      message,
      email,
      dispatch,
    });
  }
);

export const intercomSlice = createAsyncThunk(
  'userProfile/intercom',
  async ({ user, appId, accessToken, organizationId }, { dispatch }) => {
    await intercomAPI({ user, appId, accessToken, organizationId, dispatch });
  }
);

export const authSlice = createSlice({
  name: 'userProfile',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    G2Reviewsreducer: (state, action) => {
      state.G2Reviews = action.payload;
    },
    zendeskReducer: (state, action) => {
      state.zendeskdata = action.payload[0];
    },
    discourseButtonReducer: (state, action) => {
      state.discourseButtonVisible = action.payload;
    },
    discourseSecretKeyReducer: (state, action) => {
      state.discourseSecretKey = action.payload;
    },
    discourseURLGeneratorReducer: (state, action) => {
      state.DiscourseURL = action.payload;
    },
    zendeskButtonReducer: (state, action) => {
      state.zendeskButtonVisible = action.payload;
    },
    intercomButtonReducer: (state, action) => {
      state.intercomButtonVisible = action.payload;
    },
    intercomButtonDisableReducer: (state, action) => {
      state.intercomDisableButton = action.payload;
    },
    zendeskSecretKeyReducer: (state, action) => {
      state.zendeskSecretKey = action.payload;
    },
    zendeskURLGeneratorReducer: (state, action) => {
      state.zendeskURL = action.payload;
    },
    intercomURLGeneratorReducer: (state, action) => {
      state.intercomURL = action.payload;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(intercomSlice.pending, (state) => {
        state.intercomLoader = true;
      })
      .addCase(intercomSlice.fulfilled, (state) => {
        state.intercomLoader = false;
      })
      .addCase(intercomSlice.rejected, (state) => {
        state.intercomLoader = false;
      });
  },
});

export const {
  G2Reviewsreducer,
  zendeskReducer,
  discourseButtonReducer,
  discourseSecretKeyReducer,
  discourseURLGeneratorReducer,
  zendeskButtonReducer,
  zendeskSecretKeyReducer,
  zendeskURLGeneratorReducer,
  intercomButtonReducer,
  intercomURLGeneratorReducer,
  intercomButtonDisableReducer,
} = authSlice.actions;

export default authSlice.reducer;
