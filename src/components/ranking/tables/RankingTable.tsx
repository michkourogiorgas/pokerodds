import { Fragment } from "react/jsx-runtime";
import { usePokerSelector } from "../../../store/hooks";
import U from "./utils";
import C from "./constants";

const RankingTable = () => {
  const results = usePokerSelector((state) => state.results);
  const rankingTable = U.updateRankingTable(results);
  return (
    <div className="grid grid-cols-2 grid-rows-11 place-items-center bg-white p-2 rounded-lg">
      {Object.keys(rankingTable).map((key, index) => (
        <Fragment key={key}>
          <div
            className={`${C.TEXT_COLOR.BLACK} ${
              index > 0 ? C.FONT_SIZE.SMALL : C.FONT_SIZE.XLARGE
            } text-center font-sans font-medium `}
          >
            {key}
          </div>
          <div
            className={`${C.TEXT_COLOR.HERO} ${
              index > 0 ? C.FONT_SIZE.SMALL : C.FONT_SIZE.XLARGE
            } text-center font-sans font-medium `}
          >
            {rankingTable[key]}
          </div>
        </Fragment>
      ))}
    </div>
  );
};

export default RankingTable;
