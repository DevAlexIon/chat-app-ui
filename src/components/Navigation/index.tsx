import React from "react";
import { NavLink } from "react-router-dom";
import { FaCog, FaUserFriends as FaUserFriendsFilled } from "react-icons/fa";
import {
  AiOutlineMessage,
  AiOutlineHome,
  AiFillMessage,
  AiFillHome,
  AiOutlineUsergroupAdd,
} from "react-icons/ai";
import { IoCalendarOutline, IoCalendarSharp } from "react-icons/io5";
import { LiaCogSolid } from "react-icons/lia";

const Navigation: React.FC = () => {
  return (
    <div className="flex flex-col w-22 h-screen bg-white pt-5 shadow-custom">
      <div className="flex justify-center items-center h-12 mb-2">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center justify-center w-full h-full ${
              isActive ? "text-custom-purple rounded-lg p-2" : "text-black"
            }`
          }
        >
          {({ isActive }) =>
            isActive ? <AiFillHome size={24} /> : <AiOutlineHome size={24} />
          }
        </NavLink>
      </div>
      <div className="flex justify-center items-center h-12 mb-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center justify-center w-full h-full ${
              isActive ? "text-custom-purple rounded-lg p-2" : "text-black"
            }`
          }
        >
          {({ isActive }) =>
            isActive ? (
              <AiFillMessage size={24} />
            ) : (
              <AiOutlineMessage size={24} />
            )
          }
        </NavLink>
      </div>
      <div className="flex justify-center items-center h-12 mb-2">
        <NavLink
          to="/user"
          className={({ isActive }) =>
            `flex items-center justify-center w-full h-full ${
              isActive ? "text-custom-purple rounded-lg p-2" : "text-black"
            }`
          }
        >
          {({ isActive }) =>
            isActive ? (
              <FaUserFriendsFilled size={24} />
            ) : (
              <AiOutlineUsergroupAdd size={24} />
            )
          }
        </NavLink>
      </div>
      <div className="flex justify-center items-center h-12 mb-2">
        <NavLink
          to="/calendar"
          className={({ isActive }) =>
            `flex items-center justify-center w-full h-full ${
              isActive ? "text-custom-purple rounded-lg p-2" : "text-black"
            }`
          }
        >
          {({ isActive }) =>
            isActive ? (
              <IoCalendarSharp size={24} />
            ) : (
              <IoCalendarOutline size={24} />
            )
          }
        </NavLink>
      </div>
      <div className="flex justify-center items-center h-12 mb-2 mt-auto">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center justify-center w-full h-full ${
              isActive ? "text-custom-purple rounded-lg p-2" : "text-black"
            }`
          }
        >
          {({ isActive }) =>
            isActive ? <FaCog size={24} /> : <LiaCogSolid size={24} />
          }
        </NavLink>
      </div>
    </div>
  );
};

export default Navigation;
