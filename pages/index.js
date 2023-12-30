import { useSocket } from "@/context/socket";
import { useEffect } from "react";

export default function Home() {
  const socket = useSocket();

  useEffect(() => {
    socket?.on("connect", () => {
      console.log("Socket ID:", socket.id);
    });
  }, [socket]);

  return <div>Welcome</div>;
}
