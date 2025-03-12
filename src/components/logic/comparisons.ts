import { Card, Hand, HandAssesment, Player } from "../../types";
import U from "./utils";
import { getStrength } from "./hand";

const initialValue = { name: "", value: 0, kickers: 0 };

const isValueGreater = (current: HandAssesment, best: HandAssesment): boolean =>
  current.value > best.value;

const isValueEqual = (current: HandAssesment, best: HandAssesment): boolean =>
  current.value === best.value;

const isKickerGreater = (
  current: HandAssesment,
  best: HandAssesment
): boolean => current.kickers > best.kickers;

const isKickerEqual = (current: HandAssesment, best: HandAssesment): boolean =>
  current.kickers === best.kickers;

const isHandStronger = (
  current: HandAssesment,
  best: HandAssesment
): boolean => {
  return (
    isValueGreater(current, best) ||
    (isValueEqual(current, best) && isKickerGreater(current, best))
  );
};

const isHandEqual = (current: HandAssesment, best: HandAssesment): boolean =>
  isValueEqual(current, best) && isKickerEqual(current, best);

const bestHand = (hands: Hand[]): HandAssesment =>
  hands.reduce((max, currentHand) => {
    const current = getStrength(currentHand);
    return isHandStronger(current, max) ? current : max;
  }, initialValue);

const getStongerHandPerPlayer = (
  community: Card[],
  players: Player[]
): HandAssesment[] => {
  const stongerHandPerPlayer: HandAssesment[] = [];
  players.forEach((player) => {
    const combinations = U.getCombinations([...community, ...player], 5);
    const stongerHand = bestHand(combinations);
    stongerHandPerPlayer.push(stongerHand);
  });
  return stongerHandPerPlayer;
};

const comparePlayers = (community: Hand[], players: Player[]) => {
  const bestHandPerPlayer = getStongerHandPerPlayer(community, players);
  const winners = bestHandPerPlayer.reduce((max: number[], current, index) => {
    const maxHand = bestHandPerPlayer[max[0]] || bestHandPerPlayer[0];
    const areEqual = isHandEqual(maxHand, current);
    if (areEqual) {
      max.push(index);
    }
    const isStronger = isHandStronger(maxHand, current);
    if (isStronger) {
      max = [index];
    }
    return max;
  }, []);
  return winners;
};

export { comparePlayers };
