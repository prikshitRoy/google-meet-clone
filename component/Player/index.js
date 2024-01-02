import ReactPlayer from "react-player";
import cx from "classnames";
import styles from "@/component/Player/index.module.css";

const Player = (props) => {
  const { url, muted, playing, isActive } = props;

  return (
    <div
      className={cx(styles.playerContainer, {
        [styles.notActive]: !isActive,
        [styles.active]: isActive,
        /* [styles.notPlaying]: !playing, */
      })}
    >
      <ReactPlayer
        url={url}
        muted={muted}
        playing={playing}
        width="1oo%"
        height="100%"
      />
    </div>
  );
};

export default Player;
