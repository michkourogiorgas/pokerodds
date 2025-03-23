import { evaluateHand } from "./hand";
import U from "./utils";

import { Hand, HandEvaluation, Players, PlayerValuation } from "../../types";

const sortByValue = (hands: HandEvaluation[]): HandEvaluation[] =>
  hands.sort((a, b) => b.value - a.value || b.kickers - a.kickers);

const evaluateHands = (combinations: Hand[]): HandEvaluation[] =>
  combinations.map((combination) => ({
    ...evaluateHand(combination),
  }));

const evaluatePlayer = (community: Hand, player: Hand): HandEvaluation => {
  const possibleHands = U.getCombinations([...community, ...player], 5);
  const evaluatedHands = evaluateHands(possibleHands);
  return sortByValue(evaluatedHands)[0];
};

const evaluateTable = (community: Hand, players: Players): PlayerValuation => {
  const tableEvaluation: PlayerValuation = {};
  Object.keys(players).map((key) => {
    const player = players[key];
    const bestHandPerPlayer = evaluatePlayer(community, player);
    tableEvaluation[key] = bestHandPerPlayer;
  });
  return tableEvaluation;
};

const getWinners = (players: PlayerValuation): string[] => {
  const bestValue = sortByValue(Object.values(players))[0];
  return Object.keys(players).filter(
    (key) =>
      players[key].value === bestValue.value &&
      players[key].kickers === bestValue.kickers
  );
};

export { getWinners, evaluateTable };
