import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store";
import {
  fetchUserFriends,
  selectUserFriends,
} from "../../store/slices/userSlice";

const Friends: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserFriends());
  }, [dispatch]);

  const friends = useSelector(selectUserFriends);

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
        />
      </div>
      <div className="flex-1 overflow-y-auto">
        {friends.map((friend) => (
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
                <span className="text-xs text-gray-500">{friend.time}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">{friend.message}</span>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${friend.statusColor}`}
                >
                  {friend.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Friends;
