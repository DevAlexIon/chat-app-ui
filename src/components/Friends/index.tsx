import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store";
import {
  fetchUserFriends,
  getFriendRequests,
  selectFriendRequests,
  selectUserFriends,
  sendFriendRequest,
  selectSearchResults,
  acceptFriendRequest,
  declineFriendRequest,
} from "../../store/slices/userSlice";
import { BsPersonAdd, BsPersonDash } from "react-icons/bs";
import { createDebouncedSearch } from "../../utils/debouncedSearch";
import { Friend, FriendRequest } from "../../types/types";

const Friends: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchFriend, setSearchFriend] = useState("");
  const searchResults = useSelector(selectSearchResults);
  const debouncedSearch = useCallback(createDebouncedSearch(dispatch), [
    dispatch,
  ]);

  useEffect(() => {
    dispatch(getFriendRequests());
    dispatch(fetchUserFriends());
  }, [dispatch]);

  useEffect(() => {
    if (searchFriend.trim()) {
      debouncedSearch(searchFriend);
    }
  }, [searchFriend, debouncedSearch]);

  const friends = useSelector(selectUserFriends);
  const friendRequest = useSelector(selectFriendRequests);

  const handleSendFriendRequest = (friendId: string) => {
    dispatch(sendFriendRequest(friendId)).then(() => {
      dispatch(getFriendRequests());
    });
  };

  return (
    <div className="flex flex-col w-369 h-screen bg-white p-4 ml-6">
      <div className="flex justify-between items-center my-3">
        <h2 className="text-xl font-semibold">Friends</h2>
        <span className="bg-purple-500 text-white text-sm py-1 px-3 rounded-full">
          {friends.length || 0}
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
                    {friendRequest.sentRequests.some(
                      (request: FriendRequest) =>
                        request.recipientId?._id === friend._id
                    ) ? (
                      <BsPersonDash size={20} />
                    ) : (
                      <BsPersonAdd
                        size={20}
                        className={`cursor-pointer`}
                        onClick={() => handleSendFriendRequest(friend._id)}
                      />
                    )}
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
          friends.map((friend: Friend) => (
            <div
              key={friend._id}
              className="flex items-center mb-4 p-2 rounded-lg hover:bg-gray-200 cursor-pointer"
            >
              <img
                src={friend.avatar}
                className="w-12 h-12 rounded-full bg-gray-300 mr-4"
              />
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold">{friend.username}</span>
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
