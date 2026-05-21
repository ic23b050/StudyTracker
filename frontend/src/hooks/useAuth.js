import { useState } from "react";
import API from "../services/api.js";

export default function useAuth() {
  const [error, setError] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));

  const login = async (username, password) => {
    try {
      const res = await API.post("/auth/login", {
        username,
        password,
      });

      localStorage.setItem("token", res.data);
      setToken(res.data);
      setError("");
    } catch (err) {
      setError("Login failed");
      console.log(err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return {
    login,
    logout,
    error,
    token,
  };
}
