import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    register: (state, action) => {
      // Handle registration logic
      // For now, just simulate successful registration
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    login: (state, action) => {
      // Handle login logic
      // For now, just simulate successful login
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { register, login, logout, setError } = authSlice.actions;
export default authSlice.reducer;
