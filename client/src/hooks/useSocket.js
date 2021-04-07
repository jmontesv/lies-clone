import { useContext } from "react";
import { SocketContext } from "../contexts/SocketProvider";

export default function useSocket() {
  return useContext(SocketContext);
}
