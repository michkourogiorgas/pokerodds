import { evaluateTable, getWinners } from "./evaluation";
import U from "./utils";
import {
  FrequencyCounter,
  Hand,
  Players,
  PlayerValuation,
  Results,
} from "../../types";

const updateHeroRankings = (
  tableEvaluation: PlayerValuation,
  ranking: FrequencyCounter
): void => U.updateFrequencyCounter(ranking, tableEvaluation.hero.name);

const updateWinners = (
  winners: FrequencyCounter,
  roundWinners: string[]
): void => {
  if (roundWinners.length > 1) return;
  U.updateFrequencyCounter(winners, roundWinners[0]);
};

const updateTies = (ties: FrequencyCounter, roundWinners: string[]): void => {
  if (roundWinners.length === 1) return;
  roundWinners.forEach((winner) => {
    U.updateFrequencyCounter(ties, winner);
  });
};

const updateRounds = (rounds: FrequencyCounter): void =>
  U.updateFrequencyCounter(rounds, "total");

const mergeResults = (data: Results[]): Results => {
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

      Object.entries(current.rounds).forEach(([key, value]) => {
        accumulator.rounds[key] = (accumulator.rounds[key] || 0) + value;
      });

      return accumulator;
    },
    {
      hero: {},
      villain: {},
      ranking: {},
      rounds: {},
    } as Results
  );
};

const getResults = (
  communityCombinations: Hand[],
  players: Players
): Results => {
  const winners = {};
  const ties = {};
  const ranking = {};
  const rounds = {};
  communityCombinations.forEach((community) => {
    const tableEvaluation = evaluateTable(community, players);
    const roundWinners = getWinners(tableEvaluation);
    updateHeroRankings(tableEvaluation, ranking);
    updateWinners(winners, roundWinners);
    updateTies(ties, roundWinners);
    updateRounds(rounds);
  });
  return { winners, ties, ranking, rounds };
};

export { getResults, mergeResults };
