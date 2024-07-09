import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { logout } from "../store/slices/authSlice";

const isTokenExpired = (token: string): boolean => {
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return (decodedToken as { exp: number }).exp < currentTime;
  } catch (error) {
    return true;
  }
};

const useCheckTokenExpiration = () => {
  const dispatch = useDispatch();

  const checkToken = () => {
    const token = localStorage.getItem("token");
    if (token && isTokenExpired(token)) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      dispatch(logout());
    }
  };

  return checkToken;
};

export default useCheckTokenExpiration;
