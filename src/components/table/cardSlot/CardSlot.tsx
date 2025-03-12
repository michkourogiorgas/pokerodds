import { useSelector } from "react-redux";
import EmptyCardSlot from "./EmptySlot";
import Card from "../../card/Card";

type cardSlotProps = {
  position: string;
  slotIndex: number;
  cardIndex: number;
};

const CardSlot = ({ position, slotIndex, cardIndex }) => {
  const deck = useSelector((state) => state.deck);
  const card = deck[cardIndex];
  let Slot;

  if (card) {
    Slot = (
      <Card
        suit={card.suit}
        value={card.value}
        index={card.index}
        isSelected={false}
        isHoverable
      />
    );
  } else {
    Slot = <EmptyCardSlot position={position} slotIndex={slotIndex} />;
  }

  return <div className="w-9 h-12 border-[#21617F] rounded-sm">{Slot}</div>;
};

export default CardSlot;
