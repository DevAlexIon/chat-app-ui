import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "..";
import toast from "react-hot-toast";

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

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
    },
    setUserDetails: (state, { payload }: PayloadAction<User>) => {
      state.user = payload;
      state.isLoggedIn = true;
    },
  },
});

export default authSlice.reducer;

export const register =
  (userData: { username: string; email: string; password: string }) =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await fetch("http://localhost:5001/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

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
      const response = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (!response.ok) {
        return Promise.reject(data.msg);
      }

      dispatch(setUserDetails(data.userProfile));
      localStorage.setItem("token", data.token);
      return Promise.resolve("Login successful!");
    } catch (error) {
      return Promise.reject("Login failed. Please check your credentials.");
    }
  };

export const selectUserDetails = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isLoggedIn;

export const { setUserDetails } = authSlice.actions;
