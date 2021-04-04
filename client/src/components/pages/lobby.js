import React, { useEffect } from "react";
import { useLobby } from "../../contexts/LobbyProvider";
import { useHistory } from "react-router-dom";
import HostDashBoard from "../hostDashBoard";
import { useSocket } from "../../contexts/SocketProvider";

function Lobby() {
  const socket = useSocket();
  const { lobby } = useLobby();
  const history = useHistory();

  useEffect(() => {
    socket.on("user-joined", (user) => {
      console.log("Usuario añadido a unsa sala", user);
    });
    if (lobby === null) {
      history.push("/");
    }
  }, []);

  return (
    lobby && (
      <div>
        <HostDashBoard />
      </div>
    )
  );
}

export default Lobby;
