import React, { useEffect } from "react";
import useLobby from "../hooks/useLobby";
import { useHistory } from "react-router-dom";
import DashBoard from "../components/DashBoard";

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
