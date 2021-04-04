import React, { useEffect } from "react";
import { useLobby } from "../contexts/LobbyProvider";
import { Button } from "react-bootstrap";
import { useSocket } from "../contexts/SocketProvider";

function HostDashBoard() {
  const socket = useSocket();
  const { lobby } = useLobby();

  useEffect(() => {
    socket && socket.emit("join-room", lobby.id);
  }, [socket]);

  const invite = () => {
    navigator.clipboard.writeText(
      `${window.location.href}/${lobby.invitationId}`
    );
  };

  return (
    <div>
      <h1>Lobby</h1>
      <h2>{`Jugadores: ${lobby && lobby.users.length}`}</h2>
      {lobby && lobby.users.map((player) => <p>{player}</p>)}
      <div className="button_container d-flex">
        <Button variant="light" onClick={(e) => invite()}>
          Invitar
        </Button>
        <Button variant="light" className="ml-2">
          Comenzar!
        </Button>
      </div>
    </div>
  );
}

export default HostDashBoard;
