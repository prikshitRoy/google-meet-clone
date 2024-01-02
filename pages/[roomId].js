import { useSocket } from "@/context/socket";
import usePeer from "@/hook/peer";

const Room = () => {
  const socket = useSocket();
  const { peer, myId } = usePeer();
};
export default Room;
