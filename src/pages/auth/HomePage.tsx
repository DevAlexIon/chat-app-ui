import React from "react";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../store/slices/authSlice";
import Navigation from "../../components/Navigation";

const HomePage: React.FC = () => {
  const test = useSelector(selectUserDetails);
  return (
    <>
      <Navigation />
    </>
  );
};

export default HomePage;
