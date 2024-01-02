import ReactPlayer from "react-player";

const Player = (props) => {
  const { PlayrtId, url, muted, playing } = props;

  return (
    <div>
      <ReactPlayer key={PlayrtId} url={url} muted={muted} playing={playing} />
    </div>
  );
};

export default Player;
