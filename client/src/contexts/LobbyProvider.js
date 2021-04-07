import React, { useState, useEffect, createContext } from "react";
import useSocket from "../hooks/useSocket";
import useUser from "../hooks/useUser";

export const LobbyContext = createContext();

export default function LobbyProvider({ children }) {
  const [lobby, setLobby] = useState(null);
  const [users, setUsers] = useState([]);
  const { user, setUser } = useUser();
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;
    socket.on("user-disconnected", (newUserList) => {
      console.log("desconectando usuario");
      setUsers(newUserList);
    });
    socket.on("user-joined", (user) => {
      console.log("Usuario añadido a la sala", user);
      setUsers((prev) => [...prev, user]);
    });
    return () => {
      socket.off("user-disconnected");
      socket.off("user-joined");
    };
  }, [socket]);

  useEffect(() => {
    if (!socket) return;
    socket.on("change-host", (newHost) => {
      console.log("El lobby ha cambiado de leader", newHost);
      console.log(user);
      if (newHost.socketId === user.socketId) setUser(newHost);
    });
    return () => socket.off("change-host");
  }, [user, socket]);

  const value = {
    lobby,
    setLobby,
    users,
    setUsers,
  };

  return (
    <LobbyContext.Provider value={value}>{children}</LobbyContext.Provider>
  );
}
