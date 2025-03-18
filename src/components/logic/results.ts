import { getBestHand, getBestHandPerPlayer } from "./comparisons";
import U from "./utils";
import {
  FrequencyCounter,
  Hand,
  HandAssesment,
  Players,
  PokerDataHand,
  TotalPokerData,
} from "../../types";

const updateHeroRankings = (
  bestHands: HandAssesment[],
  ranking: FrequencyCounter
): void => {
  for (const hand of bestHands) {
    if (hand.player === "hero") {
      ranking[hand.name] = (ranking[hand.name] ?? 0) + 1;
    }
  }
};

const getResults = (
  communityCombinations: Hand[],
  players: Players
): PokerDataHand => {
  const winners = {};
  const ties = {};
  const ranking = {};
  communityCombinations.forEach((community) => {
    const bestHandPerPlayer = getBestHandPerPlayer(community, players);
    updateHeroRankings(bestHandPerPlayer, ranking);
    const winner = getBestHand(bestHandPerPlayer);

    if (winner.length === 1) {
      U.updateFrequencyCounter(winners, winner[0].player, 1);
    } else {
      for (const player of winner) {
        U.updateFrequencyCounter(ties, player.player, 1);
      }
    }
  });
  return { winners, ties, ranking };
};

const mergeResults = (data: PokerDataHand[]): TotalPokerData => {
  return data.reduce(
    (accumulator, current) => {
      Object.entries(current.winners).forEach(([key, value]) => {
        if (key === "hero") {
          accumulator.hero["wins"] = (accumulator.hero["wins"] || 0) + value;
        } else {
          accumulator.villain["wins"] =
            (accumulator.villain["wins"] || 0) + value;
        }
      });

      Object.entries(current.ties).forEach(([key, value]) => {
        if (key === "hero") {
          accumulator.hero["ties"] = (accumulator.hero["ties"] || 0) + value;
        } else {
          accumulator.villain["ties"] =
            (accumulator.villain["ties"] || 0) + value;
        }
      });

      Object.entries(current.ranking).forEach(([key, value]) => {
        accumulator.ranking[key] = (accumulator.ranking[key] || 0) + value;
      });

      return accumulator;
    },
    {
      hero: {},
      villain: {},
      ranking: {},
    } as TotalPokerData
  );
};

export { getResults, mergeResults };
