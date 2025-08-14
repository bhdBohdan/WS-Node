import { useState } from "react";
import "./Input.css";
import { useSocket } from "../context/socketContext";
import type { CurrentChat } from "../models/models";

const CustomInput: React.FC<{ currentChat: CurrentChat }> = ({
  currentChat,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  // const navigate = useNavigate();

  const { socket } = useSocket();

  if (!socket) {
    throw new Error("Failure to connect to Socket");
  }
  if (currentChat.name === "") return null;

  const handleSend = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!inputValue) {
      return;
    }
    const event = currentChat.type + "Message";
    console.log(event);
    e.preventDefault();
    socket.emit(event, {
      to: currentChat.name,
      channel: currentChat.name,
      text: inputValue,
    }); // ✅ sending to server
    setInputValue("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="inputMessage">
      <input
        type="text"
        placeholder="Send..."
        name="messag"
        onChange={handleChange}
        value={inputValue}
      />
      <button className="button-49" type="button" onClick={handleSend}>
        Send
      </button>
    </div>
  );
};

export default CustomInput;
