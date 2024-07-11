import React from "react";
import Navigation from "../../components/Navigation";
import Friends from "../../components/Friends";

const FriendsPage: React.FC = () => {
  return (
    <div className="flex">
      <Navigation />
      <Friends />
    </div>
  );
};

export default FriendsPage;
