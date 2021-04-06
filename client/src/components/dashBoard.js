import React, { useEffect } from "react";
import { useLobby } from "../contexts/LobbyProvider";
import { Button } from "react-bootstrap";
import { useSocket } from "../contexts/SocketProvider";
import { useUser } from "../contexts/UserProvider";

function DashBoard() {
  const socket = useSocket();
  const { lobby, users } = useLobby();
  const { user } = useUser();

  useEffect(() => {
    if (socket == null) return;

    socket.emit("join-room", lobby.id, user.socketId);
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
      {users && users.map((user) => <p key={user.socketId}>{user.userName}</p>)}
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

export default DashBoard;
