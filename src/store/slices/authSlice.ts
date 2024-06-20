import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "..";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  username: string;
  email: string;
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
    login(state, action: PayloadAction<User>) {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;

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
        throw new Error("Invalid credentials"); // Throw error for invalid credentials
      }

      const data = await response.json();
      dispatch(login(data.user));
      localStorage.setItem("token", data.token);
      return { success: true, user: data.user }; // Return user data upon successful login
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
      return { success: false, error: error.message }; // Return error information upon login failure
    }
  };
