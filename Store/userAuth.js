import { createSlice } from "@reduxjs/toolkit";

const userData = {
  name: "",
  email: "",
  Authenticated: false,
};

export const userAuth = createSlice({
  name: "userAuthentication",
  initialState: userData,
  reducers: {
    signin: (state, action) => {
      state.Authenticated = true;
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    signout: (state) => {
      state.Authenticated = false;
      state.name = "";
      state.email = "";
    },
  },
});
export const authActions = userAuth.actions;
