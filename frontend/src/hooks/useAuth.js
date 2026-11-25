import { useState } from "react";
import API from "../services/api.js";
import { useEffect } from "react";
import { setSessionExpiredHandler as setOnSessionExpiredHandler } from "../services/api.js";

export default function useAuth() {
  const [loginError, setLoginError] = useState("");
  const [registrationError, setRegistrationError] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userName, setUserName] = useState(null);

  const clearError = () => {
    setLoginError("");
    setRegistrationError("");
  };

  const handleLogin = async (username, password) => {
    try {
      const res = await API.post("/auth/login", {
        username,
        password,
      });

      localStorage.setItem("token", res.data);
      setToken(res.data);
      setLoginError("");
    } catch (err) {
      setLoginError("Login failed");
      console.log(err);
    }
  };

  const handleRegistration = async (username, password) => {
    try {
      await API.post("/auth/register", {
        username,
        password,
      });
      setRegistrationError("");
      console.log("Registration successful");
      handleLogin(username, password);
    } catch (err) {
      if (err.response?.status === 409) {
        setRegistrationError("Username already exists");
      } else {
        setRegistrationError("Registration failed");
      }
      console.log(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUserName(null);
  };

  const fetchUserName = async () => {
    try {
      const res = await API.get("/auth/me");
      setUserName(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!token) return;

    fetchUserName();
  }, [token]);

  const handleSessionExpired = () => {
    handleLogout();
    setLoginError("Session expired. Please log in again.");
  };

  useEffect(() => {
    setOnSessionExpiredHandler(handleSessionExpired);
  }, []);

  return {
    handleLogin,
    handleLogout,
    loginError,
    registrationError,
    token,
    userName,
    fetchUserName,
    handleRegistration,
    clearError,
  };
}
