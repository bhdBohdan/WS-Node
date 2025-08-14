import { useState, useRef, useEffect } from "react";
import useMessages from "../hooks/useMessage";
import type { DirMesDTO, MessageDTO, CurrentChat } from "../models/models";
import CustomInput from "../components/Input";
import Message from "../components/Message";
import { useSocket } from "../context/socketContext";
import { useParams, useSearchParams } from "react-router-dom";
import useHistory from "../hooks/useHistory";

const Chat: React.FC = () => {
  const containerRef = useRef(null);
  const { socket } = useSocket();

  const [messages, setMessages] = useState<(MessageDTO | DirMesDTO)[]>([]);
  const [currentChat, setCurrentChat] = useState<CurrentChat>({
    type: "channel",
    name: "",
  });

  const { chat } = useParams<{ chat: string }>();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") as "channel" | "dm";

  useEffect(() => {
    if (!(chat && type)) return;

    if (type === "channel") socket?.emit("joinChannel", chat);
    if (type === "dm") socket?.emit("getDMs", chat);

    setCurrentChat({
      type: type,
      name: chat,
    });

    return () => {
      //cleanUp
      if (type === "channel") {
        socket?.emit("leaveChannel", chat); // leave old channel
      }
      setMessages([]);
    };
  }, [chat, type, socket]);

  useEffect(() => {
    const container: any = containerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight; // scroll to bottom
    }
  }, [messages]);

  useHistory((msg: (MessageDTO | DirMesDTO)[]) => {
    setMessages(msg);
  });

  useMessages(
    (msg: MessageDTO) => {
      if (currentChat?.type === "channel" && currentChat.name === msg.channel)
        setMessages((prev) => [...prev, msg]);
    },
    (msg: DirMesDTO) => {
      if (
        currentChat?.type === "dm" &&
        (msg.to === currentChat.name || msg.from === currentChat.name)
      ) {
        setMessages((prev) => [...prev, msg]);
      }
    }
  );

  const myId = socket?.id;

  return (
    <div className="chat">
      <div className="container" ref={containerRef}>
        {messages.map((m, i) => (
          <Message key={i} message={m} isMy={myId === m.senderId} />
        ))}
      </div>

      <CustomInput currentChat={currentChat} />
    </div>
  );
};

export default Chat;
