import React, { useEffect } from "react";
import { useLobby } from "../../contexts/LobbyProvider";
import { useHistory } from "react-router-dom";
import HostDashBoard from "../hostDashBoard";
import { SocketProvider } from "../../contexts/SocketProvider";

function Lobby() {
  const { lobby } = useLobby();
  const history = useHistory();

  useEffect(() => {
    if (lobby === null) {
      history.push("/");
    }
  }, []);

  return (
    lobby && (
      <SocketProvider id={lobby.id}>
        <HostDashBoard />
      </SocketProvider>
    )
  );
}

export default Lobby;
