import React, { useEffect } from "react";
import useLobby from "../hooks/useLobby";
import { Button } from "react-bootstrap";
import useSocket from "../hooks/useSocket";

function DashBoard() {
  const socket = useSocket();
  const { lobby, users } = useLobby();

  useEffect(() => {
    if (socket == null) return;

    socket.emit("join-room", lobby.id, socket.id);
  }, []);

  const invite = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/${lobby.invitationId}`
    );
  };

  return (
    <div>
      <h1>Lobby</h1>
      <h2>{`Jugadores: ${users && users.length}`}</h2>
      {users &&
        users.map((user) => (
          <p key={user.socketId}>
            {user.userName}Es host: {user.isHost.toString()}
          </p>
        ))}
      <div className="button_container d-flex">
        <Button variant="light" onClick={invite}>
          Invitar
        </Button>
        <Button variant="light" className="ml-2">
          Comenzar!
        </Button>
      </div>
    </div>
  );
}

export default DashBoard;
