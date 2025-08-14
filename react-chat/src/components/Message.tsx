import type { MessageDTO, DirMesDTO } from "../models/models";
import "./Message.css";

const Message: React.FC<{ message: MessageDTO | DirMesDTO; isMy: boolean }> = ({
  message,
  isMy,
}) => {
  const date = new Date(message.timestamp);
  const timeString = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`messageouter ${isMy ? "my" : ""}`}>
      <div className="message">
        <label className="message-username">{message.username}</label>
        <p className="message-text">{message.text}</p>
        <p className="timestamp">{timeString}</p>
      </div>
    </div>
  );
};

export default Message;
