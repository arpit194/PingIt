import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("pingit-user")
    ? JSON.parse(localStorage.getItem("pingit-user"))
    : null,
  token: localStorage.getItem("pingit-token")
    ? JSON.stringify(localStorage.getItem("pingit-token"))
    : null,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialState,
  reducers: {
    login(state, { payload }) {
      state.user = payload.user;
      state.token = JSON.stringify(payload.token);
      localStorage.setItem("pingit-user", JSON.stringify(payload.user));
      localStorage.setItem("pingit-token", payload.token);
    },
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("pingit-user");
      localStorage.removeItem("pingit-token");
    },
    setUser(state, { payload }) {
      state.user = payload;
      localStorage.setItem("pingit-user", JSON.stringify(payload));
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
