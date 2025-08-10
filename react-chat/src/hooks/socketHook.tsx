import { useEffect } from "react";
import { socket } from "../socket";
import type { MessageDTO } from "../models/models";

export default function useMessages(onMessage: (msg: MessageDTO) => void) {
  useEffect(() => {
    socket.on("message", onMessage);

    return () => {
      socket.off("message", onMessage);
    };
  }, [onMessage]);
}
