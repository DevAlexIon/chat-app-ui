import React from "react";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../store/slices/authSlice";
import Navigation from "../../components/Navigation";
import MessagesSidebar from "../../components/Messages";

const HomePage: React.FC = () => {
  const test = useSelector(selectUserDetails);
  return (
    <div className="flex">
      <Navigation />
      <MessagesSidebar />
    </div>
  );
};

export default HomePage;
