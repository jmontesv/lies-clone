import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { useLobby } from "./LobbyProvider";

const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ id, children }) {
  const [socket, setSocket] = useState();
  const lobby = useLobby();

  useEffect(() => {
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);

    return () => newSocket.close();
  }, [lobby]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
