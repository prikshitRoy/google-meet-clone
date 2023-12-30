import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket;
};

export const SocketProvider = (props) => {
  const { children } = props;
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const connection = io();

    //!Viewing Socket, only connection is not Stablished.
    //! To Stablish connection call api/socket.js
    console.log("Socket Connection", connection);

    setSocket(connection);
  }, []);

  return <SocketContext.Provider>{children}</SocketContext.Provider>;
};
