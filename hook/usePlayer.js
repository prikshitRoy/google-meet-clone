import { cloneDeep } from "lodash";
const { useState } = require("react");

const usePlayer = (myId) => {
  const [players, setPlayers] = useState({});
  const playersCopy = cloneDeep(players);

  const playerHighlighted = playersCopy[myId];
  delete playersCopy[myId];

  const nonHighlightedPlayers = playersCopy;

  return { players, setPlayers, playerHighlighted, nonHighlightedPlayers };
};

export default usePlayer;
