import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { getResult, mike } from "../../logic/results";
import {
  deckActions,
  tableActions,
  validationActions,
  resultsActions,
} from "../../../store";
import Button from "./Button";
import Modal from "../../modal/Modal";

const ButtonArea = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const deck = useSelector((state) => state.deck);
  const table = useSelector((state) => state.table);
  const validation = useSelector((state) => state.validation);
  const dispatch = useDispatch();

  const handleReset = (): void => {
    dispatch(deckActions.reset());
    dispatch(tableActions.reset());
    dispatch(validationActions.reset());
    dispatch(resultsActions.reset());
  };

  const handleRun = async (): void => {
    // console.log(validation);
    // // const isBelowThreshold = (currentValue) => currentValue < 40;

    // // const array1 = [1, 30, 39, 29, 10, 13];
    // // console.log(Object.keys(table).every(table[key]));
    // let mike = true;
    // Object.keys(validation).map((item) => {
    //   const isValid = validation[item].every((item) => item);
    //   mike = isValid && mike;
    // });
    // console.log(mike);
    // if (!mike) return;
    // setIsModalOpen(true);
    // mike([1, 2, 3, 4, 5]);
    // const result = getResult(deck, table).then((result) => {
    //   return result;
    // });
    // console.log(result);
    const result = getResult(deck, table);
    console.log(result);
    result.then((value) => {
      resolve("Success!");
      console.log(value); // 1
    });
    // dispatch(resultsActions.updateResults({ winners, ties, ranking }));
  };

  return (
    <div className="flex flex-row place-items-center gap-4 my-4 ">
      {isModalOpen && <Modal />}
      <Button handleClick={handleRun}>Run</Button>
      <Button handleClick={handleReset}>Reset</Button>
    </div>
  );
};

export default ButtonArea;
