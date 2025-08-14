import { useEffect, useState } from "react";
import { useSocket } from "../context/socketContext";
import { Link, useParams } from "react-router-dom";

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

  const { chat } = useParams<{ chat: string }>();

  return (
    <div className="navigation">
      <h2>Channels</h2>
      {chats.channels.map((ch) => (
        <Link
          style={chat === ch ? { color: "red" } : {}}
          key={ch}
          to={`/${ch}?type=channel`}
        >
          {ch}
        </Link>
      ))}

      <br />

      <h2>Users</h2>
      {chats.userDms.map((ch) => (
        <Link
          style={chat === ch ? { color: "red" } : {}}
          key={ch}
          to={`/${ch}?type=dm`}
        >
          {ch}
        </Link>
      ))}
    </div>
  );
};

export default Navigation;
