import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "..";

interface User {
  avatar: string;
  email: string;
  id: string;
  lastLogin: string;
  username: string;
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
};

export const loadUserFromLocalStorage = createAsyncThunk(
  "auth/loadUserFromLocalStorage",
  async (_, { dispatch }) => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      dispatch(setUserDetails(JSON.parse(user)));
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserDetails(state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.user = null;
      state.isLoggedIn = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const register =
  (userData: { username: string; email: string; password: string }) =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await fetch(
        "https://pure-gorge-66268-06ab3e8d137a.herokuapp.com/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return Promise.reject(data.msg);
      }

      dispatch(setUserDetails(data.userProfile));
      localStorage.setItem("token", data.token);
      return Promise.resolve("Registration successful!");
    } catch (error) {
      return Promise.reject("Registration failed. Please try again.");
    }
  };

export const login =
  (userData: { email: string; password: string }) =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await fetch(
        "https://pure-gorge-66268-06ab3e8d137a.herokuapp.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        return Promise.reject(data.msg);
      }

      dispatch(setUserDetails(data.userProfile));

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.userProfile));
      return Promise.resolve("Login successful!");
    } catch (error) {
      return Promise.reject("Login failed. Please check your credentials.");
    }
  };

export const selectUserDetails = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isLoggedIn;

export const { setUserDetails, logout } = authSlice.actions;
export default authSlice.reducer;
