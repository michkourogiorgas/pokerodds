import { usePokerSelector } from "../../../store/hooks";
import U from "./utils";

const RankingTable = () => {
  const results = usePokerSelector((state) => state.results);
  const rankingTable = U.updateRankingTable(results);
  return (
    <div className="grid grid-cols-2 grid-rows-11 place-items-center bg-white p-2 rounded-lg">
      {Object.keys(rankingTable).map((key, index) => (
        <>
          <div
            className={`text-[#393939] ${
              index > 0 ? "text-xs" : "text-xl"
            } text-center font-sans font-medium `}
          >
            {key}
          </div>
          <div
            className={`text-[#007c7b] ${
              index > 0 ? "text-xs" : "text-xl"
            } text-center font-sans font-medium `}
          >
            {rankingTable[key]}
          </div>
        </>
      ))}
    </div>
  );
};

export default RankingTable;
