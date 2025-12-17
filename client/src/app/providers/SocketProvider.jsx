// client/src/app/providers/SocketProvider.jsx
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "../../context/AuthContext.jsx";

const SocketContext = createContext(null);

// Helper to derive socket URL
const getSocketBaseUrl = () => {
  // If you later add VITE_SOCKET_URL or VITE_API_BASE_URL, this will pick it up
  const socketEnv = import.meta.env.VITE_SOCKET_URL;
  const apiEnv = import.meta.env.VITE_API_BASE_URL;

  if (socketEnv) return socketEnv;

  if (apiEnv) {
    // strip trailing /api/v1 if present
    return apiEnv.replace(/\/api\/v1\/?$/, "");
  }

  // fallback for local dev
  return "http://localhost:5000";
};

export const SocketProvider = ({ children }) => {
  const { user } = useAuth();
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // If user is not logged in, ensure no active socket
    if (!user) {
      if (socket) {
        socket.disconnect();
        setSocket(null);
        setConnected(false);
      }
      return;
    }

    const token = localStorage.getItem("nexaspace_access_token");
    const baseUrl = getSocketBaseUrl();

    const newSocket = io(baseUrl, {
      transports: ["websocket", "polling"],
      auth: {
        // server can read this in socket.handshake.auth.token
        token: token ? `Bearer ${token}` : undefined
      }
      // autoConnect: true by default
    });

    setSocket(newSocket);

    const handleConnect = () => setConnected(true);
    const handleDisconnect = () => setConnected(false);

    newSocket.on("connect", handleConnect);
    newSocket.on("disconnect", handleDisconnect);

    return () => {
      newSocket.off("connect", handleConnect);
      newSocket.off("disconnect", handleDisconnect);
      newSocket.disconnect();
      setConnected(false);
    };
    // re-run when user identity changes
  }, [user?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const value = useMemo(
    () => ({
      socket,
      connected,
      isConnected: connected
    }),
    [socket, connected]
  );

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const ctx = useContext(SocketContext);
  if (!ctx) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return ctx;
};

// default export so main.jsx can do `import SocketProvider from "./app/providers/SocketProvider.jsx"`
export default SocketProvider;
