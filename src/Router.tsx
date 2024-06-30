// AppRouter.tsx
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/auth/RegisterPage";
import LoginPage from "./pages/auth/LoginPage";
import HomePage from "./pages/auth/HomePage";
import PrivateWrapper from "./utils/ProtectedRoute";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "./store/slices/authSlice";
import useCheckTokenExpiration from "./utils/tokenExpiration";

const AppRouter: React.FC = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const checkTokenExpiration = useCheckTokenExpiration();

  useEffect(() => {
    checkTokenExpiration();

    const interval = setInterval(() => {
      checkTokenExpiration();
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

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
