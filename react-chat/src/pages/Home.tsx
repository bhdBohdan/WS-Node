import { useEffect, useState } from "react";
import { useSocket } from "../context/socketContext";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const { socket } = useSocket();
  const navigate = useNavigate();

  const handleSend = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    //setTimeout(() => {}, 2000);
    console.log("triggered");
    socket?.emit("joinServer", inputValue); // ✅ sending to server
    setInputValue("");
  };

  useEffect(() => {
    if (!socket) return;

    // listen for username from server
    const onUsername = (username: string) => {
      console.log("Received username:", username);
      navigate("/general?type=channel");
    };

    socket.on("username", onUsername);

    return () => {
      socket.off("username", onUsername);
    };
  }, [socket, navigate]);

  return (
    <div className="homeForm" style={{ margin: "10vh" }}>
      <label> Enter your Name </label>
      <input
        style={{
          margin: "20px",
        }}
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
      />
      <button onClick={handleSend}>Submit</button>
    </div>
  );
};

export default Home;
