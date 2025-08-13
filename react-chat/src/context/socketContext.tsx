import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";

type SocketContextType = {
  socket: Socket | null;
  connectSocket: () => void;
};

type SocketProviderProps = {
  children: React.ReactNode;
};

export const SocketContext = createContext<SocketContextType | null>(null);

// Provider
export const SocketProvider = ({ children }: SocketProviderProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  // useEffect(() => {
  //   const newSocket = io("http://localhost:8080");
  //   setSocket(newSocket);

  //   return () => {
  //     newSocket.disconnect();
  //   };
  // }, []);

  const connectSocket = () => {
    if (!socket) {
      const newSocket: Socket = io("http://localhost:8080");
      setSocket(newSocket);
      return;
    }
    socket.connect();
  };

  const disconnectSocket = () => {
    if (socket) {
      socket.disconnect();
      setSocket(null);
    }
  };

  useEffect(() => {
    if (!socket) {
      const newSocket: Socket = io("http://localhost:8080");
      setSocket(newSocket);
      newSocket.connect();
      return;
    }

    return () => {
      if (socket) {
        console.log(socket.id, ": DISCONNECTED");
        socket.disconnect();
      }
    };
  }, []); //will start and will end when whole provider unmounts

  const contextValue = useMemo(
    () => ({ socket, connectSocket, disconnectSocket }),
    [socket]
  );

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
};

//hook
export const useSocket = () => {
  const socket = useContext(SocketContext);
  if (!socket)
    throw new Error("Socket not available! Wrap your app in SocketProvider.");
  return socket;
};
