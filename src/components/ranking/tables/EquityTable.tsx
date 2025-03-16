import { useSelector } from "react-redux";
import Row from "./Row";
import C from "./constants";
import U from "./utils";

const EquityTable = () => {
  const results = useSelector((state) => state.results);
  const equityTable = U.updateEquityTable(results);

  return (
    <div className="grid grid-cols-3 grid-rows-4 place-items-center bg-white p-2 rounded-lg">
      {equityTable.map((row, index) => (
        <Row
          key={index}
          hand={row[0]}
          hero={row[1]}
          villains={row[2]}
          fontSize={index ? "default" : "title"}
        />
      ))}
    </div>
  );
};

export default EquityTable;
