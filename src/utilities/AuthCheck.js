import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { info_toaster } from "./Toaster";

export const setLoginStatus = (data) => {
  try {
    localStorage.setItem("loginStatus", data);
  } catch (err) {}
};

export const AuthCheck = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (
      !localStorage.getItem("loginStatus") ||
      !localStorage.getItem("accessToken")
    ) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("loginStatus");
      localStorage.removeItem("userEmail");
      navigate("/login");
      info_toaster("Please login first!");
    }
  }, [navigate]);
};
