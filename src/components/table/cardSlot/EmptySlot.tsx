import { useState, DragEvent } from "react";
import { usePokerDispatch, usePokerSelector } from "../../../store/hooks";
import {
  deckActions,
  updateTableAsync,
  validateAsync,
} from "../../../store/store";
import cardSlot from "../../../../public/img/cardSlot.png";

type EmptyCardSlotProps = {
  position: string;
  slotIndex: number;
};

const EmptyCardSlot = ({ position, slotIndex }: EmptyCardSlotProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const validation = usePokerSelector((state) => state.validation);
  const deck = usePokerSelector((state) => state.deck);
  const dispatch = usePokerDispatch();

  const handleDrop = async (event: DragEvent) => {
    event.preventDefault();
    const cardIndex = +event.dataTransfer.getData("text/plain");
    dispatch(deckActions.updateDeck({ cardIndex, isSelected: true }));
    dispatch(
      updateTableAsync({ position, slotIndex, card: deck[cardIndex] })
    ).then(() => {
      dispatch(validateAsync());
    });
  };

  const handleLeave = (event: DragEvent) => {
    event.preventDefault();
    setIsHovered(false);
  };

  const handleOver = (event: DragEvent) => {
    event.preventDefault();
    setIsHovered(true);
  };

  const isValid = validation[position][slotIndex];

  const border = !isValid
    ? "border-2 border-red-600"
    : isHovered
    ? "border-2 border-green-600"
    : "";

  return (
    <div onDrop={handleDrop} onDragLeave={handleLeave} onDragOver={handleOver}>
      <img
        className={`${border} min-w-9 rounded-sm`}
        src={cardSlot}
        alt="EmptyCardSlot"
      />
    </div>
  );
};

export default EmptyCardSlot;
