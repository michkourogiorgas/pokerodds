import { useState } from "react";
import { usePokerDispatch, usePokerSelector } from "../../../store/hooks";
import { runPokerOdds } from "../../logic/runCalculator";
import {
  deckActions,
  tableActions,
  validationActions,
  resultsActions,
} from "../../../store/store";
import Button from "./Button";
import Modal from "../../modal/Modal";
import U from "./utils";

const ButtonArea = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = usePokerDispatch();
  const deck = usePokerSelector((state) => state.deck);
  const table = usePokerSelector((state) => state.table);
  const validation = usePokerSelector((state) => state.validation);
  const isDisabled = U.hasFalse(validation);

  const handleReset = (): void => {
    dispatch(deckActions.reset());
    dispatch(tableActions.reset());
    dispatch(validationActions.reset());
    dispatch(resultsActions.reset());
  };

  const handleRun = async () => {
    setIsModalOpen(true);
    runPokerOdds(deck, table).then((results) => {
      const { winners, ties, ranking } = results;
      dispatch(resultsActions.updateResults({ winners, ties, ranking }));
      setIsModalOpen(false);
    });
  };

  return (
    <div className="flex flex-row place-items-center gap-4 my-4 ">
      {isModalOpen && !U.hasCommunity(table.community) && <Modal />}
      <Button handleClick={handleRun} isDisabled={isDisabled}>
        Run
      </Button>
      <Button handleClick={handleReset} isDisabled={false}>
        Reset
      </Button>
    </div>
  );
};

export default ButtonArea;
