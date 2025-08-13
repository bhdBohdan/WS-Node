import { useState, useRef, useEffect } from "react";
import useMessages from "../hooks/useMessage";
import type { MessageDTO } from "../models/models";
import CustomInput from "./Input";
import Message from "./Message";
import { useSocket } from "../context/socketContext";

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<MessageDTO[]>([]);
  const containerRef = useRef(null);
  const { socket } = useSocket();

  useEffect(() => {
    const container: any = containerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight; // scroll to bottom
    }
  }, [messages]);

  useMessages((msg: MessageDTO) => {
    console.log("mesageGot");
    setMessages((prev) => [...prev, msg]);
  });

  const myId = socket?.id;

  return (
    <div className="chat">
      <div className="container" ref={containerRef}>
        {messages.map((m, i) => (
          <Message key={i} message={m} isMy={myId === m.senderId} />
        ))}
      </div>

      <CustomInput />
    </div>
  );
};

export default Chat;
