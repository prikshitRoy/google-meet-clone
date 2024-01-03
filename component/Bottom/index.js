import cx from "classnames";
import { Mic, Video, PhoneOff, MicOff, VideoOff } from "lucide-react";

import styles from "@/component/Bottom/index.module.css";

const Bottom = (props) => {
  const { muted, playing, toggleAudio, toggleVideo, leaveRoom } = props;

  return (
    <div className={styles.bottomMenu}>
      {muted ? (
        <MicOff
          size={55}
          className={cx(styles.icon, styles.active)}
          onClick={toggleAudio}
        />
      ) : (
        <Mic size={55} className={styles.icon} onClick={toggleAudio} />
      )}
      {playing ? (
        <Video size={55} className={styles.icon} onClick={toggleVideo} />
      ) : (
        <VideoOff
          size={55}
          className={cx(styles.icon, styles.active)}
          onClick={toggleVideo}
        />
      )}
      <PhoneOff size={55} className={cx(styles.icon)} onClick={leaveRoom} />
    </div>
  );
};

export default Bottom;
