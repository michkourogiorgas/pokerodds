import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { runPokerOdds } from "../../logic/runCalculator";
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

  const handleRun = async () => {
    runPokerOdds(deck, table).then((results) => {
      const { winners, ties, ranking } = results;
      dispatch(resultsActions.updateResults({ winners, ties, ranking }));
    });
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
