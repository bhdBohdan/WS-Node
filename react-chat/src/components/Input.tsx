import { useState } from "react";
import "./Input.css";
import { socket } from "../socket";

const CustomInput: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleSend = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!inputValue) {
      return;
    }
    e.preventDefault();
    socket.emit("message", inputValue); // ✅ sending to server
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
        name="message"
        onChange={handleChange}
        value={inputValue}
      />
      <button className="button-49" role="button" onClick={handleSend}>
        Send
      </button>
    </div>
  );
};

export default CustomInput;
