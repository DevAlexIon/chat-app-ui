import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store";
import {
  fetchUserFriends,
  getFriendRequests,
  selectFriendRequests,
  selectUserFriends,
  sendFriendRequest,
} from "../../store/slices/userSlice";
import debounce from "lodash/debounce";
import { BsPersonAdd } from "react-icons/bs";

interface Friend {
  _id: string;
  avatar: string;
  username: string;
}

interface FriendRequest {
  createdAt: string;
  recipientId: {
    avatar: string;
    email: string;
    username: string;
    _id: string;
  };
  status: string;
  updatedAt: string;
  _id: string;
}

type FriendRequests = {
  receivedRequests: FriendRequest[];
  sentRequests: FriendRequest[];
};

const Friends: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchFriend, setSearchFriend] = useState("");
  const [searchResults, setSearchResults] = useState<Friend[]>([]);
  const token = localStorage.getItem("token") || "";

  const fetchSearchResults = useCallback(
    debounce(async (query: string) => {
      if (query.trim()) {
        try {
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
          setSearchResults(data);
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      } else {
        setSearchResults([]);
      }
    }, 300),
    [token]
  );

  useEffect(() => {
    dispatch(getFriendRequests());
    dispatch(fetchUserFriends());
  }, [dispatch]);

  useEffect(() => {
    fetchSearchResults(searchFriend);
    return () => {
      fetchSearchResults.cancel();
    };
  }, [searchFriend, fetchSearchResults]);

  const friends = useSelector(selectUserFriends);
  const friendRequest = useSelector(selectFriendRequests);

  return (
    <div className="flex flex-col w-369 h-screen bg-white p-4 ml-6">
      <div className="flex justify-between items-center my-3">
        <h2 className="text-xl font-semibold">Friends</h2>
        <span className="bg-purple-500 text-white text-sm py-1 px-3 rounded-full">
          {friends.length}
        </span>
      </div>
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search friends"
          className="w-full p-2 rounded-lg bg-gray-200"
          value={searchFriend}
          onChange={(e) => setSearchFriend(e.target.value)}
        />
      </div>
      <div className="flex-1 overflow-y-auto">
        {searchFriend.length > 0 ? (
          searchResults.length > 0 ? (
            searchResults.map((friend: Friend) => (
              <div
                key={friend._id}
                className="flex items-center mb-4 p-2 rounded-lg hover:bg-gray-200"
              >
                <img
                  src={friend.avatar}
                  className="w-10 h-10 rounded-full bg-gray-300 mr-4"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1 ">
                    <span className="font-semibold">{friend.username}</span>
                    <BsPersonAdd
                      size={22}
                      className="cursor-pointer"
                      onClick={() => dispatch(sendFriendRequest(friend._id))}
                    />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-500 text-center mt-4">
              No friends found
            </div>
          )
        ) : (
          // friends.map((friend: Friend) => (
          //   <div
          //     key={friend._id}
          //     className="flex items-center mb-4 p-2 rounded-lg hover:bg-gray-200 cursor-pointer"
          //   >
          //     <img
          //       src={friend.avatar}
          //       className="w-12 h-12 rounded-full bg-gray-300 mr-4"
          //     />
          //     <div className="flex-1">
          //       <div className="flex justify-between items-center mb-1">
          //         <span className="font-semibold">{friend.username}</span>
          //       </div>
          //     </div>
          //   </div>
          // ))
          friendRequest.sentRequests.map((request: FriendRequest) => (
            <div
              key={request._id}
              className="flex items-center mb-4 p-2 rounded-lg hover:bg-gray-200 cursor-pointer"
            >
              <img
                src={request.recipientId.avatar}
                className="w-12 h-12 rounded-full bg-gray-300 mr-4"
              />
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold">
                    {request.recipientId.username}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Friends;
