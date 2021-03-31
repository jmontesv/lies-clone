import React, { useEffect } from "react";
import { useLobby } from "../../contexts/LobbyProvider";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function Lobby() {
  const { lobby } = useLobby();
  const history = useHistory();

  const invite = () => {
    // console.log(window.location.href);
    navigator.clipboard.writeText(
      window.location.href.replace("lobby", lobby.lobbyId)
    );
  };

  useEffect(() => {
    console.log(lobby);
    if (lobby === null) {
      history.push("/");
      if (lobby === null) {
        history.push("/");
      }
    }
  });

  return (
    <div>
      <h1>Lobby</h1>
      <h2>{`Jugadores: ${lobby && lobby.players.length}`}</h2>
      {lobby && lobby.players.map((player) => <p>{player}</p>)}
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

export default Lobby;
