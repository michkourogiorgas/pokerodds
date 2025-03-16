import { DragEvent } from "react";
import { useDispatch } from "react-redux";
import {
  deckActions,
  // tableActions,
  removeCardAsync,
  validateAsync,
} from "../../store";
import C from "./constants";

type CardProps = {
  suit: string;
  value: string;
  index: number;
  isSelected: boolean;
};

const Card = ({
  suit,
  value,
  index,
  isSelected,
  isHoverable = false,
}: propsType) => {
  const dispatch = useDispatch();
  const opacity = isSelected ? C.OPACITY : C.NO_OPACITY;
  const isVisible = isHoverable && "group-hover:flex group-hover:flex-col";

  const handleDragStart = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("text/plain", index);
  };

  const handleClick = () => {
    dispatch(deckActions.updateDeck({ cardIndex: index, isSelected: false }));
    dispatch(removeCardAsync({ cardIndex: index })).then(() => {
      dispatch(validateAsync());
    });
  };

  return (
    <>
      <div
        id={index}
        draggable={!isSelected && !isHoverable}
        onDragStart={handleDragStart}
        className={`group relative w-9.75 h-13 flex flex-col px-0.5 
          ${C.BG_COLOR[suit]} ${opacity} ${C.TEXT_COLOR[suit]}
          border-2 border-white text-white rounded-sm skew-x-0`}
      >
        <div className="text-[8px] text-left">{value}</div>
        <div className={`text-md text-center ${C.SUIT_SYMBOL[suit]}`} />
        <div className="text-[8px] rotate-180">{value}</div>
        <div
          onClick={handleClick}
          className={`hidden absolute inset-0 ${isVisible} items-center justify-center bg-black/70 ${C.TEXT_COLOR[suit]} text-lg cursor-pointer rounded-sm`}
        >
          X
        </div>
      </div>
    </>
  );
};

export default Card;
