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

interface Friend {
  _id: string;
  avatar: string;
  username: string;
}

interface FriendRequest {
  createdAt: string;
  requester: {
    avatar: string;
    email: string;
    username: string;
    _id: string;
  };
  status: string;
  updatedAt: string;
  _id: string;
}

interface AuthState {
  user: User | null;
  friends: Friend[];
  friendRequests: {
    receivedRequests: FriendRequest[];
    sentRequests: FriendRequest[];
  };
  searchResults: Friend[];
}

const initialState: AuthState = {
  user: null,
  friends: [],
  friendRequests: {
    receivedRequests: [],
    sentRequests: [],
  },
  searchResults: [],
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
  "user/fetchUserFriends",
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
      return data;
    } catch (error) {
      toast.error("Network error");
      return rejectWithValue("Network error");
    }
  }
);

export const acceptFriendRequest = createAsyncThunk(
  "user/acceptFriendRequest",
  async (requestId: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token") || "";
      const response = await fetch(
        `http://localhost:5001/friends/${requestId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
          body: JSON.stringify({ action: "accepted" }),
        }
      );
      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        toast.error(data.msg || "An error occurred");
        return rejectWithValue(data.msg);
      }

      toast.success(data.msg || "Friend request accepted successfully");
      return data;
    } catch (error) {
      toast.error("Network error");
      return rejectWithValue("Network error");
    }
  }
);

export const declineFriendRequest = createAsyncThunk(
  "user/declineFriendRequest",
  async (requestId: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token") || "";
      const response = await fetch(
        `http://localhost:5001/friends/${requestId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
          body: JSON.stringify({ action: "declined" }),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.msg || "An error occurred");
        return rejectWithValue(data.msg);
      }

      toast.success(data.msg || "Friend request declined successfully");
      return data;
    } catch (error) {
      toast.error("Network error");
      return rejectWithValue("Network error");
    }
  }
);

export const getFriendRequests = createAsyncThunk(
  "user/getFriendRequests",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("token") || "";
      const response = await fetch("http://localhost:5001/friends", {
        headers: {
          "x-auth-token": token,
        },
      });
      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.msg);
      }
      dispatch(setFriendRequests(data));
      return data;
    } catch (error) {
      return rejectWithValue("Network error");
    }
  }
);

export const searchFriends = createAsyncThunk(
  "user/searchFriends",
  async (query: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token") || "";
      const response = await fetch(
        `http://localhost:5001/friends/search?query=${encodeURIComponent(
          query
        )}`,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.msg);
      }
      return data;
    } catch (error) {
      return rejectWithValue("Network error");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setFriendsList(state, action) {
      state.friends = action.payload;
    },
    setFriendRequests(state, action) {
      state.friendRequests = action.payload;
    },
    setSearchResults(state, action) {
      state.searchResults = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserMessages.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(searchFriends.fulfilled, (state, action) => {
        state.searchResults = action.payload;
      });
  },
});

export const selectUserFriends = (state: RootState) => state.user.friends;
export const selectFriendRequests = (state: RootState) =>
  state.user.friendRequests;
export const selectSearchResults = (state: RootState) =>
  state.user.searchResults;

export const { setFriendsList, setFriendRequests, setSearchResults } =
  userSlice.actions;
export default userSlice.reducer;
