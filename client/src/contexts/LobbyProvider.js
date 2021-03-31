import React, { useState, useContext, createContext } from "react";

export const LobbyContext = createContext();

export const useLobby = () => {
  return useContext(LobbyContext);
};

export const LobbyProvider = ({ children }) => {
  const [lobby, setLobby] = useState(null);

  const value = {
    lobby,
    setLobby,
  };

  return (
    <LobbyContext.Provider value={value}>{children}</LobbyContext.Provider>
  );
};
