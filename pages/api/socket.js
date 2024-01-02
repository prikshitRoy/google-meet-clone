import { Server } from "socket.io";

const SocketHandler = (req, res) => {
  //!
  console.log("Called API"); //! It will not run because we did not call it explicitly in context/socket.js
  //!

  if (res.socket.server.io) {
    console.log("Socket already running");
  } else {
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("Server is connected");

      socket.on("join-room", (roomId, userId) => {
        console.log(`A new user ${userId} joined room ${roomId}`);

        socket.join(roomId);
        socket.broadcast.to(roomId).emit("user-connected", userId);
      });
    });
  }
  res.end();
};

export default SocketHandler;
