import React, { useState, useEffect, useContext, createContext } from "react";
import { useSocket } from "./SocketProvider";

export const LobbyContext = createContext();

export const useLobby = () => {
  return useContext(LobbyContext);
};

export const LobbyProvider = ({ children }) => {
  const [lobby, setLobby] = useState(null);
  const [users, setUsers] = useState([]);
  const socket = useSocket();

  useEffect(() => {
    if (socket == null) return;
    socket.on("user-joined", (user) => {
      console.log("Usuario añadido a unsa sala", user);
      setUsers((prev) => [...prev, user]);
    });
    return () => socket.off("user-joined");
  }, [socket]);

  const value = {
    lobby,
    setLobby,
    users,
    setUsers,
  };

  return (
    <LobbyContext.Provider value={value}>{children}</LobbyContext.Provider>
  );
};
