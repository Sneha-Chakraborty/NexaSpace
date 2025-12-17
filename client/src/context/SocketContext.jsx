import { createContext, useContext, useEffect } from "react";
import { socket } from "../socket/socketClient";

const SocketContext = createContext(null);

export const SocketProvider = ({ children, enabled }) => {
  useEffect(() => {
    if (!enabled) return;
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, [enabled]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
