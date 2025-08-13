import { useEffect, useState } from "react";
import { useSocket } from "../context/socketContext";

interface ChatDTO {
  channels: string[];
  userDms: string[];
}

const Navigation: React.FC = () => {
  const [chats, setChats] = useState<ChatDTO>({
    channels: [],
    userDms: [],
  });
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) return;

    const onGetChats = (chats: ChatDTO) => {
      setChats(chats);
    };

    socket.on("chats", onGetChats);
    socket.emit("getChats");
    return () => {
      socket.off("chats", onGetChats);
    };
  }, [socket]);

  return (
    <div className="navigation">
      <h2>Channels</h2>
      {chats.channels.map((ch) => (
        <a key={ch}>{ch}</a>
      ))}

      <br />

      <h2>Users</h2>
      {chats.userDms.map((ch) => (
        <a key={ch}>{ch}</a>
      ))}
    </div>
  );
};

export default Navigation;
