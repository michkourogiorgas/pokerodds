import { UICard, CardSlot } from "../types";
import C from "./constants";

const getDeck = (): UICard[] => {
  const deck: UICard[] = [];
  C.values.forEach((value, valueIndex) => {
    C.suits.forEach((suit, suitIndex) => {
      const index = valueIndex * C.suits.length + suitIndex;
      const isSelected = false;
      deck.push({ suit, value, index, isSelected });
    });
  });
  return deck;
};

const updateDeck = (deck: UICard[], { cardIndex, isSelected }) => {
  console.log(cardIndex);
  deck.filter((card) => {
    if (card.index === cardIndex) {
      card.isSelected = isSelected;
    }
    return card;
  });
  return deck;
};

// FIX THIS SHIT
const removeCard = (slots, { cardIndex }) => {
  let foundIndex;
  let foundPosition;
  const a = Object.keys(slots).map((slot) => {
    slots[slot].map((value, index) => {
      console.log(value, index);
      if (value === cardIndex) {
        foundIndex = index;
        foundPosition = slot;
      }
    });
  });
  console.log(foundIndex, foundPosition);
  slots[foundPosition][foundIndex] = -1;

  return slots;
};

export default { getDeck, updateDeck, removeCard };
