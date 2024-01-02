import { useSocket } from "@/context/socket";
import usePeer from "@/hook/usePeer";
import useMediaStream from "@/hook/useMediaStream";
import usePlayer from "@/hook/usePlayer";

import Player from "@/component/Player";
import { useEffect } from "react";

import styles from "@/styles/room.module.css";

const Room = () => {
  const socket = useSocket();
  const { peer, myId } = usePeer();
  const { stream } = useMediaStream();
  const { players, setPlayers, playerHighlighted, nonHighlightedPlayers } =
    usePlayer(myId);

  useEffect(() => {
    if (!socket || !peer || !stream) return;
    const handleUserConnected = (newUser) => {
      console.log(`User Connected in room with User ID ${newUser}`);

      const call = peer.call(newUser, stream);

      call.on("stream", (incomingStream) => {
        console.log(`Incoming stream from ${newUser}`);
        setPlayers((prev) => ({
          ...prev,
          [newUser]: {
            url: incomingStream,
            muted: true,
            playing: true,
          },
        }));
      });
    };
    socket.on("user-connected", handleUserConnected);

    return () => {
      socket.off("user-connected", handleUserConnected);
    };
  }, [peer, socket, stream, setPlayers]);

  useEffect(() => {
    if (!peer || !stream) return;
    peer.on("call", (call) => {
      const { peer: callerId } = call;
      call.answer(stream);

      call.on("stream", (incomingStream) => {
        console.log(`Incoming stream from ${callerId}`);
        setPlayers((prev) => ({
          ...prev,
          [callerId]: {
            url: incomingStream,
            muted: true,
            playing: true,
          },
        }));
      });
    });
  }, [peer, stream, setPlayers]);

  useEffect(() => {
    if (!stream || !myId) return;
    console.log(`Getting my stream ${myId}`);
    setPlayers((prev) => ({
      ...prev,
      [myId]: {
        url: stream,
        muted: true,
        playing: true,
      },
    }));
  }, [myId, stream, setPlayers]);

  return (
    <>
      <div className={styles.activePlayerContainer}>
        {playerHighlighted && (
          <Player
            url={playerHighlighted.url}
            muted={playerHighlighted.muted}
            playing={playerHighlighted.playing}
            isActive
          />
        )}
      </div>
      <div className={styles.inActivePlayerContainer}>
        {Object.keys(nonHighlightedPlayers).map((playerId) => {
          const { url, muted, playing } = nonHighlightedPlayers[playerId];

          return (
            <Player
              key={playerId}
              url={url}
              muted={muted}
              playing={playing}
              isActive={false}
            />
          );
        })}
      </div>
    </>
  );
};
export default Room;
