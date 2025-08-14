import { useEffect } from "react";
import type { MessageDTO, DirMesDTO } from "../models/models";
import { useSocket } from "../context/socketContext";

export default function useMessages(
  onChannel: (msg: MessageDTO) => void,
  onDM: (msg: DirMesDTO) => void
) {
  const { socket } = useSocket();
  useEffect(() => {
    socket!.on("channelMessage", onChannel);
    socket!.on("dmMessage", onDM);

    return () => {
      socket!.off("channelMessage", onChannel);
      socket!.off("dmMessage", onDM);
    };
  }, [onChannel, onDM]);
}
