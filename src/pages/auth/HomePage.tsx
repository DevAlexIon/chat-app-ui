import React from "react";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../store/slices/authSlice";

const HomePage: React.FC = () => {
  const test = useSelector(selectUserDetails);
  console.log(test);
  return (
    <>
      <h1>Home Page</h1>
    </>
  );
};

export default HomePage;
