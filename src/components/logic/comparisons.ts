import { getHandStrength } from "./hand";
import U from "./utils";
import { Hand, HandAssesment, Players } from "../../types";

const getHandsStrength = (
  combinations: Hand[],
  player: string
): HandAssesment[] =>
  combinations.map((combination) => ({
    ...getHandStrength(combination),
    player,
  }));

const getBestHand = (hands: HandAssesment[]): HandAssesment[] => {
  hands.sort((a, b) => b.value - a.value || b.kickers - a.kickers);
  return hands.filter(
    (hand) => hand.value === hands[0].value && hand.kickers === hands[0].kickers
  );
};

const getBestHandPerPlayer = (
  community: Hand,
  players: Players
): HandAssesment[] => {
  const bestHands: HandAssesment[] = [];
  Object.keys(players).map((key) => {
    const player = players[key];
    const combinations = U.getCombinations([...community, ...player], 5);
    const handsStrength = getHandsStrength(combinations, key);
    const bestHand = getBestHand(handsStrength)[0];
    bestHands.push(bestHand);
  });
  return bestHands;
};

export { getBestHand, getBestHandPerPlayer };
