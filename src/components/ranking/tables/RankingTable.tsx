import { useSelector } from "react-redux";
import Row from "./Row";
import U from "./utils";

const RankingTable = () => {
  const results = useSelector((state) => state.results);
  const rankingTable = U.updateRankingTable(results);
  return (
    <div className="grid grid-cols-2 grid-rows-11 place-items-center bg-white p-2 rounded-lg">
      {Object.keys(rankingTable).map((key, index) => (
        <Row
          key={key}
          hand={key}
          hero={rankingTable[key]}
          fontSize={index ? "default" : "title"}
        />
      ))}
    </div>
  );
};

export default RankingTable;
