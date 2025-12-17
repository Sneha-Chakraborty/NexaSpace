// client/src/app/providers/AuthProvider.jsx
import { useCallback, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import axiosInstance from "../../api/axiosInstance";
import { ENDPOINTS } from "../../api/endpoints";

const TOKEN_KEY = "nxs_access_token";

const applyToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMe = useCallback(async () => {
    try {
      // Restore token from localStorage (if any) on app load
      const storedToken = localStorage.getItem(TOKEN_KEY);
      if (storedToken) {
        applyToken(storedToken);
      }

      const res = await axiosInstance.get(ENDPOINTS.AUTH_ME);
      const me = res.data?.data?.user || null;
      setUser(me);
    } catch (_err) {
      setUser(null);
      applyToken(null);
      localStorage.removeItem(TOKEN_KEY);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
    applyToken(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-nexablack text-white">
        <p className="text-sm text-gray-300">Loading NexaSpace…</p>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        setUser,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
