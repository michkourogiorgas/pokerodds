import { usePokerSelector } from "../../../store/hooks";
import U from "./utils";
import C from "./constants";

const EquityTable = () => {
  const results = usePokerSelector((state) => state.results);
  const table = usePokerSelector((state) => state.table);
  const equityTable = U.updateEquityTable(results, table);
  const fontColor = ["text-[#007c7b]", "text-[#393939]", "text-[#731C16]"];
  const fontSize = ["text-xl", "text-xs", "text-xl"];

  return (
    <div className="grid grid-cols-3 grid-rows-4 place-items-center bg-white p-2 rounded-lg">
      {equityTable.map((item, index) => (
        <div
          className={`${fontColor[index % fontSize.length]} ${
            index > 2 ? "text-xs" : fontSize[index % fontSize.length]
          } text-center font-sans font-medium `}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default EquityTable;
