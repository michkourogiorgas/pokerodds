import { useState, DragEvent } from "react";
import { useDispatch } from "react-redux";
import { deckActions, tableActions } from "../../../store";
import cardSlot from "../../../../public/img/cardSlot.png";

const EmptyCardSlot = ({ position, slotIndex }) => {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);

  const handleDrop = (event: DragEvent) => {
    event.preventDefault();
    const cardIndex = +event.dataTransfer.getData("text/plain");
    dispatch(deckActions.updateDeck({ cardIndex, isSelected: true }));
    dispatch(tableActions.updateTable({ position, slotIndex, cardIndex }));
  };

  const handleLeave = (event: DragEvent) => {
    event.preventDefault();
    setIsHovered(false);
  };

  const handleOver = (event: DragEvent) => {
    event.preventDefault();
    setIsHovered(true);
  };

  const border = isHovered && "border-2 border-red-600";

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
