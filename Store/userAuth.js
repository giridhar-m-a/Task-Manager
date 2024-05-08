import { createSlice } from "@reduxjs/toolkit";

const userData = {
  name: undefined,
  email: undefined,
  Authenticated: false,
  userId: undefined,
  accessToken: undefined,
  refreshToken: undefined,
  tokenType: undefined,
  expiresAt: undefined,
  expiresIn: undefined,
  userDetails: undefined,
};

export const userAuth = createSlice({
  name: "userAuthentication",
  initialState: userData,
  reducers: {
    signin: (state, action) => {
      state.Authenticated = true;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.userId = action.payload.userId;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.tokenType = action.payload.tokenType;
      state.expiresAt = action.payload.expiresAt;
      state.expiresIn = action.payload.expiresIn;
      state.userDetails = action.payload.userDetails;
    },
    signout: (state) => {
      state.Authenticated = false;
      state.name = undefined;
      state.email = undefined;
      state.userDetails = undefined;
      state.userId = undefined;
      state.accessToken = undefined;
      state.refreshToken = undefined;
      state.tokenType = undefined;
      state.expiresAt = undefined;
      state.expiresIn = undefined;
    },
  },
});
export const authActions = userAuth.actions;
