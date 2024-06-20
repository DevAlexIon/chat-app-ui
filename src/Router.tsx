// AppRouter.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/auth/RegisterPage";
import LoginPage from "./pages/auth/LoginPage";
import HomePage from "./pages/auth/HomePage";
import PrivateWrapper from "./utils/ProtectedRoute";
import { useSelector } from "react-redux";
import { RootState } from "./store";

const AppRouter: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isLoggedIn
  );

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<PrivateWrapper auth={{ isAuthenticated }} />}>
          <Route path="/dashboard" element={<HomePage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
