import "./Message.css";

const Message: React.FC<{ isMy?: boolean; children: React.ReactNode }> = (
  props
) => {
  return (
    <div className={`messageouter ${props.isMy ? "my" : ""}`}>
      <div className="message">
        <p>{props.children}</p>
      </div>
    </div>
  );
};

export default Message;
