import C from "./constants";
import { Results } from "../../../types";

const updateEquityTable = ({ winners, ties }: Results) => {
  const equityTable = [...C.EQUITY_TABLE];
  if (!winners.length) {
    return C.EQUITY_TABLE;
  }
  equityTable[1][0] = winners[0];
  equityTable[1][2] = winners[1];
  equityTable[2][0] = ties[0];
  equityTable[2][2] = ties[1];
  return equityTable;
};

const updateRankingTable = ({
  ranking,
}: {
  ranking: Record<string, string>;
}) => {
  const rankingTable = { ...C.RANKING_TABLE };
  if (!Object.keys(ranking).length) {
    return rankingTable;
  }
  Object.keys(ranking).forEach((key) => {
    rankingTable[key] = ranking[key];
  });
  return rankingTable;
};

export default { updateEquityTable, updateRankingTable };
