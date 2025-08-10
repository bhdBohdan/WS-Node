import { useEffect, useRef, useState } from "react";
import CustomInput from "./components/Input";
import { socket } from "./socket";
import useMessages from "./hooks/socketHook";
import type { MessageDTO } from "./models/models";
import Message from "./components/Message";

function App() {
  const [messages, setMessages] = useState<MessageDTO[]>([]);
  const containerRef = useRef(null);

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

  const myId = socket.id;

  return (
    <>
      <div className="container" ref={containerRef}>
        {messages.map((m, i) => (
          <Message key={i} isMy={m.senderId === myId}>
            {m.text}
          </Message>
        ))}
      </div>

      <CustomInput />
    </>
  );
}

export default App;
