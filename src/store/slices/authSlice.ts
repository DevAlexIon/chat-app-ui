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
    setLoginDetails: (state, { payload }: PayloadAction<User>) => {
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

      if (response.status === 400) {
        throw new Error("User already exists. Please login.");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      return { success: true, user: data.token };
    } catch (error) {
      toast.error(`${error.message}`);
      return { success: false, error: error.message };
    }
  };

export const loginAsync =
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

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      dispatch(setLoginDetails(data.userProfile));
      localStorage.setItem("token", data.token);
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
    }
  };

export const selectUserDetails = (state: RootState) => state.auth.user;

export const { setLoginDetails } = authSlice.actions;
