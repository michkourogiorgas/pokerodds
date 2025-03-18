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
      if (value.index === cardIndex) {
        foundIndex = index;
        foundPosition = slot;
      }
    });
  });
  slots[foundPosition][foundIndex] = -1;

  return slots;
};

// if (item[4] !== -1) {
//   return [
//     item[0] !== -1,
//     item[1] !== -1,
//     item[2] !== -1,
//     item[3] !== -1,
//     true,
//   ];
// } else if (item[3] !== -1) {
//   return [item[0] !== -1, item[1] !== -1, item[2] !== -1, true, true];
// } else if (item[2] !== -1 || item[1] !== -1 || item[0] !== -1) {
//   return [item[0] !== -1, item[1] !== -1, item[2] !== -1, true, true];
// } else {
//   return Array(5).fill(true);
// }
// let a = [];
// for (let i = item.length - 1; i >= 2; i++) {
//   if (item[i] !== -1) {
//     for (let j = 0; j <= item.length - 1; j++) {
//       if (j >= i) {
//         a.push(true);
//       }
//       a.push(item[2] !== j);
//     }
//     return a;
//   }
// }

const validateHero = (hero) => [hero[0] !== -1, hero[1] !== -1];

const validateCommunity = (community) => {
  if (community[4] !== -1) {
    return [
      community[0] !== -1,
      community[1] !== -1,
      community[2] !== -1,
      community[3] !== -1,
      true,
    ];
  }

  const isFlopCardSelected =
    community[0] !== -1 || community[1] !== -1 || community[2] !== -1;

  if (community[3] !== -1 || isFlopCardSelected) {
    return [
      community[0] !== -1,
      community[1] !== -1,
      community[2] !== -1,
      true,
      true,
    ];
  }

  return Array(5).fill(true);
};

const validatePlayer = (player: number[]) => {
  const isPlayerCardSelected = player[0] !== -1 || player[1] !== -1;
  if (isPlayerCardSelected) {
    return [player[0] !== -1, player[1] !== -1];
  }
  return Array(2).fill(true);
};

const runValidation = (state, { table }) => {
  Object.keys(table).map((key) => {
    if (key === "hero") {
      state[key] = validateHero(table[key]);
    } else if (table[key].length === 5) {
      state[key] = validateCommunity(table[key]);
    } else {
      state[key] = validatePlayer(table[key]);
    }
  });
  return state;
};

export default {
  getDeck,
  updateDeck,
  removeCard,
  validateCommunity,
  validatePlayer,
  runValidation,
};
