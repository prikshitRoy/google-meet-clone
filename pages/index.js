import { useSocket } from "@/context/socket";
import { useEffect } from "react";
// import usePeer from "@/hooks/usePeer";

export default function Home() {
  const socket = useSocket();
  // usePeer();

  useEffect(() => {
    socket?.on("connect", () => {
      console.log("Socket ID:", socket.id);
    });
  }, [socket]);

  return <div>Welcome</div>;
}
