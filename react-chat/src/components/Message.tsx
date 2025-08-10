import type { MessageDTO } from "../models/models";
import "./Message.css";

const Message: React.FC<{ message: MessageDTO; isMy: boolean }> = ({
  message,
  isMy,
}) => {
  return (
    <div className={`messageouter ${isMy ? "my" : ""}`}>
      <div className="message">
        <label className="message-username">{message.username}</label>
        <p className="message-text">{message.text}</p>
      </div>
    </div>
  );
};

export default Message;
