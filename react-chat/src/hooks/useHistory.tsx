import { useEffect } from "react";
import type { MessageDTO, DirMesDTO } from "../models/models";
import { useSocket } from "../context/socketContext";

export default function useHistory(
  onGetHistory: (msg: (MessageDTO | DirMesDTO)[]) => void
) {
  const { socket } = useSocket();
  useEffect(() => {
    socket!.on("messages", onGetHistory);

    return () => {
      socket!.off("messages", onGetHistory);
    };
  }, [onGetHistory]);
}
