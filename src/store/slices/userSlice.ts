import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "..";
import toast from "react-hot-toast";

interface User {
  avatar: string;
  email: string;
  id: string;
  lastLogin: string;
  username: string;
}

interface AuthState {
  user: User | null;
  friends: any[];
}

const initialState: AuthState = {
  user: null,
  friends: [],
};

export const fetchUserMessages = createAsyncThunk(
  "user/fetchUserMessages",
  async () => {
    const token = localStorage.getItem("token") || "";

    const response = await fetch(
      "http://localhost:5001/messages/668f96795892c6bef57bb9f8",
      {
        headers: {
          "x-auth-token": token,
        },
      }
    );
    const data = await response.json();
    return data;
  }
);

export const fetchUserFriends = createAsyncThunk(
  "user/fetchUserMessages",
  async (_, { dispatch }) => {
    const token = localStorage.getItem("token") || "";

    const response = await fetch("http://localhost:5001/friends/list", {
      headers: {
        "x-auth-token": token,
      },
    });
    const data = await response.json();
    dispatch(setFriendsList(data));
    return data;
  }
);

export const sendFriendRequest = createAsyncThunk(
  "user/sendFriendRequest",
  async (recipientId: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token") || "";
      const response = await fetch("http://localhost:5001/friends", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({ recipientId }),
      });
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.msg || "An error occurred");
        return rejectWithValue(data.msg);
      }

      toast.success(data.msg || "Friend request sent successfully");
    } catch (error) {
      toast.error("Network error");
      return rejectWithValue("Network error");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Define additional reducers for updating the user data
    setFriendsList(state, action) {
      state.friends = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserMessages.fulfilled, (state, action) => {
      // Update the state with the fetched user data
      state = action.payload;
    });
  },
});

export const selectUserFriends = (state: RootState) => state.user.friends;

// Export the actions and reducer
export const { setFriendsList } = userSlice.actions;
export default userSlice.reducer;
