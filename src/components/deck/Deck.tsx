import { useSelector } from "react-redux";
import { UICard } from "../../types";
import Card from "../card";

const Deck = () => {
  const deck: UICard[] = useSelector((state) => state.deck);
  return (
    <div className="grid grid-cols-4 grid-rows-9 gap-2 m-auto">
      {deck.map(({ suit, value, index, isSelected }) => {
        return (
          <Card
            key={index}
            suit={suit}
            value={value}
            index={index}
            isSelected={isSelected}
          />
        );
      })}
    </div>
  );
};

export default Deck;
