import React, { useEffect } from "react";
import { useLobby } from "../../contexts/LobbyProvider";
import { useHistory } from "react-router-dom";
import { useSocket } from "../../contexts/SocketProvider";
import DashBoard from "../dashBoard";

function Lobby() {
  const { lobby } = useLobby();
  const history = useHistory();

  useEffect(() => {
    if (!lobby) {
      history.push("/");
    }
  }, []);

  return (
    lobby && (
      <div>
        <DashBoard />
      </div>
    )
  );
}

export default Lobby;
