import C from "./constants";
import { FrequencyCounter, Players, Ranking, Results } from "../../../types";

const numberOfActiveVillains = (table: Players): number => {
  let villains = -1;
  Object.values(table).filter((player) => {
    if (player.length === 2 && player[0].index !== -1) {
      villains++;
    }
  });
  return villains;
};

const getPercentage = (value: number, totalValue: number): string => {
  if (!value) return "0%";
  return ((value / totalValue) * 100).toFixed(2) + "%";
};

const getRankingPercentage = (
  ranking: FrequencyCounter,
  total: number
): Ranking => {
  const rankingPercentage: Ranking = {};
  Object.keys(ranking).forEach((key) => {
    rankingPercentage[key] = getPercentage(ranking[key], total);
  });
  return rankingPercentage;
};

const updateEquityTable = (
  { hero, villain, rounds }: Results,
  table: Players
) => {
  if (!rounds.total) {
    return C.EQUITY_TABLE;
  }
  const total = rounds.total;
  const updatedTable = C.EQUITY_TABLE.slice();
  const villainsTotal = numberOfActiveVillains(table);
  const heroWinsPercentage = getPercentage(hero.wins, total);
  const villainsWinPercentage = getPercentage(villain.wins, total);
  const heroTiesPercentage = getPercentage(hero.ties, total);
  const villainsTiesPercentage = getPercentage(
    villain.ties,
    total / villainsTotal
  );
  updatedTable[3] = heroWinsPercentage;
  updatedTable[5] = villainsWinPercentage;
  updatedTable[6] = heroTiesPercentage;
  updatedTable[8] = villainsTiesPercentage;
  return updatedTable;
};

const updateRankingTable = (results: Results) => {
  const { ranking, rounds } = results;
  const rankingTable = { ...C.RANKING_TABLE };
  if (!rounds.total) {
    return rankingTable;
  }
  const rankingPercentage = getRankingPercentage(ranking, rounds.total);
  Object.keys(ranking).forEach((key) => {
    rankingTable[key] = rankingPercentage[key];
  });
  return rankingTable;
};

export default { updateEquityTable, updateRankingTable };
