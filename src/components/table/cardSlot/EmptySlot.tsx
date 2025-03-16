import { useState, DragEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deckActions, updateTableAsync, validateAsync } from "../../../store";
import cardSlot from "../../../../public/img/cardSlot.png";

const EmptyCardSlot = ({ position, slotIndex }) => {
  const validation = useSelector((state) => state.validation);
  const table = useSelector((state) => state.table);
  const isValid = validation[position][slotIndex];
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);

  const handleDrop = async (event: DragEvent) => {
    event.preventDefault();
    const cardIndex = +event.dataTransfer.getData("text/plain");
    dispatch(deckActions.updateDeck({ cardIndex, isSelected: true }));
    dispatch(updateTableAsync({ position, slotIndex, cardIndex })).then(() => {
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
