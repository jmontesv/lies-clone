import { useContext } from "react";
import { LobbyContext } from "../contexts/LobbyProvider";

export default function useLobby() {
  return useContext(LobbyContext);
}
