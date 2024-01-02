import { useState, useEffect, useRef } from "react";

const useMediaStream = () => {
  const [state, setState] = useState(null);
  const isStreamSet = useRef(false);

  useEffect(() => {
    if (isStreamSet.current) return;
    isStreamSet.current = true;
    (async function initStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });
        console.log("Setting your Stream");
        setState(stream);
      } catch (error) {
        console.log("Error in media Nevigator", error);
      }
    })();
  }, []);

  return {
    stream: state,
  };
};
export default useMediaStream;
