import { useEffect } from "react";
import type { MessageDTO } from "../models/models";
import { useSocket } from "../context/socketContext";

export default function useMessages(onMessage: (msg: MessageDTO) => void) {
  const { socket } = useSocket();
  useEffect(() => {
    socket!.on("message", onMessage);

    return () => {
      socket!.off("message", onMessage);
    };
  }, [onMessage]);
}
