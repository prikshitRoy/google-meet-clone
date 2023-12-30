import { Server } from "socket.io";

const SocketHandler = (req, res) => {
  //!
  console.log("Called API"); //! It will not run because we did not call it explicitly in context/socket.js
  //!

  if ((res.socket.server.io = io)) {
    console.log("Socket already running");
  } else {
    const io = new Server(req.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("Server is connected");
    });
  }
  res.end();
};

export default SocketHandler;
