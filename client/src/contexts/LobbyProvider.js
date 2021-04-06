import React, { useState, useEffect, useContext, createContext } from "react";
import { useSocket } from "./SocketProvider";
import { useUser } from "./UserProvider";

export const LobbyContext = createContext();

export const useLobby = () => {
  return useContext(LobbyContext);
};

export const LobbyProvider = ({ children }) => {
  const [lobby, setLobby] = useState(null);
  const [users, setUsers] = useState([]);
  const [hostChanged, setHostChanged] = useState(false);
  const { user, setUser } = useUser();
  const socket = useSocket();

  useEffect(() => {
    if (hostChanged) {
      if (users[0].socketId === user.socketId) {
        setUser(users[0]);
        setHostChanged(false);
      }
    }
  }, [users]);

  useEffect(() => {
    if (socket == null) return;
    socket.on("user-disconnected", (newUserList, oldUser) => {
      console.log("desconectando usuario", oldUser);
      oldUser.isHost && setHostChanged(true);
      setUsers(newUserList);
    });
    return () => socket.off("user-disconnected");
  }, [socket]);

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
