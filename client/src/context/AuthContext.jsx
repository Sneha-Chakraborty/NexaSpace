// client/src/context/AuthContext.jsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import axiosInstance from "../api/axiosInstance.js";
import {
  loginRequest,
  meRequest,
  logoutRequest,
} from "../api/auth.api.js";

const TOKEN_KEY = "nxs_access_token";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState("");

  // 🟣 Bootstrap auth on first load
  useEffect(() => {
    const bootstrap = async () => {
      try {
        const token = localStorage.getItem(TOKEN_KEY);

        if (!token) {
          setAuthLoading(false);
          return;
        }

        axiosInstance.defaults.headers.common["Authorization"] =
          `Bearer ${token}`;

        const res = await meRequest();
        const data = res.data?.data || {};
        setUser(data.user || data);
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem(TOKEN_KEY);
          delete axiosInstance.defaults.headers.common["Authorization"];
        } else {
          console.error("Auth bootstrap failed:", err);
        }
        setUser(null);
      } finally {
        setAuthLoading(false);
      }
    };

    bootstrap();
  }, []);

  // 🟣 Login
  const login = async ({ email, password }) => {
    setAuthError("");

    try {
      const res = await loginRequest({ email, password });
      const data = res.data?.data || {};

      const token = data.accessToken || data.token;
      const loggedInUser = data.user || data.me || data.profile;

      if (!token) {
        throw new Error("No access token in login response");
      }
      if (!loggedInUser) {
        throw new Error("No user in login response");
      }

      // Save token + set header
      localStorage.setItem(TOKEN_KEY, token);
      axiosInstance.defaults.headers.common["Authorization"] =
        `Bearer ${token}`;

      // Set user directly from login response
      setUser(loggedInUser);

      return true;
    } catch (err) {
      console.error("Login failed:", err);
      const msg =
        err.response?.data?.message ||
        err.message ||
        "Login failed. Please check your credentials.";
      setAuthError(msg);
      return false; // ⬅️ important: we return false instead of throwing
    }
  };

  // 🟣 Logout
  const logout = async () => {
    try {
      await logoutRequest().catch(() => {});
    } finally {
      localStorage.removeItem(TOKEN_KEY);
      delete axiosInstance.defaults.headers.common["Authorization"];
      setUser(null);
    }
  };

  // 🟣 Manually refresh /auth/me (after follow, etc.)
  const refreshUser = async () => {
    try {
      const res = await meRequest();
      const data = res.data?.data || {};
      setUser(data.user || data);
    } catch (err) {
      console.error("Failed to refresh user", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authLoading,
        authError,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
};
