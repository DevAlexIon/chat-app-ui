import React from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineMessage, AiFillMessage } from "react-icons/ai";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../store/slices/authSlice";
import { RiUserAddFill, RiUserAddLine } from "react-icons/ri";

const Navigation: React.FC = () => {
  const userDetails = useSelector(selectUserDetails);

  return (
    <div className="flex flex-col w-22 h-screen bg-white pt-5 shadow-custom z-10">
      <div>
        <div className="flex justify-center items-center h-12 mb-2">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center justify-center w-full h-full ${
                isActive ? "text-custom-purple rounded-lg p-2" : "text-black"
              }`
            }
          >
            <img
              className="w-8 h-8"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="logo"
            />
          </NavLink>
        </div>
      </div>
      <div className="mt-40 mb-96">
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
            to="/friends"
            className={({ isActive }) =>
              `flex items-center justify-center w-full h-full ${
                isActive ? "text-custom-purple rounded-lg p-2" : "text-black"
              }`
            }
          >
            {({ isActive }) =>
              isActive ? (
                <RiUserAddFill size={24} />
              ) : (
                <RiUserAddLine size={24} />
              )
            }
          </NavLink>
        </div>
      </div>
      <div>
        <div className="flex justify-center items-center h-12 mb-2">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center justify-center w-full h-full ${
                isActive ? "bg-transparent " : "bg-transparent"
              }`
            }
          >
            {({ isActive }) => (
              <img
                src={userDetails?.avatar}
                alt="User Avatar"
                className="w-6"
              />
            )}
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
