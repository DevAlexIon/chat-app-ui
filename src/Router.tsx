import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/auth/RegisterPage";
import LoginPage from "./pages/auth/LoginPage";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={RegisterPage} />
        <Route path="/login" Component={LoginPage} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
