import { Card, Combination, Hand } from "../../types";

const getCombinations = (
  cards: Card[],
  combinationLength: number,
  combinations: Combination[] = [],
  inProgressCombination: Card[] = [],
  index: number = 0
): Combination[] => {
  if (!combinationLength) {
    return [];
  }
  const isCombinationLengthReached = combinationLength == 1;
  for (let loopIndex = index; loopIndex < cards.length; loopIndex++) {
    const combination = [...inProgressCombination, cards[loopIndex]];

    if (isCombinationLengthReached) {
      combinations.push(combination);
    } else {
      getCombinations(
        cards,
        combinationLength - 1,
        combinations,
        combination,
        loopIndex + 1
      );
    }
  }

  return combinations;
};

const getPercentage = (value: number, totalValue: number): string => {
  if (!value) return "0%";
  return ((value / totalValue) * 100).toFixed(2) + "%";
};

const getCardsFromIndices = (deck, cardIndices) =>
  cardIndices.flatMap((cardIndex) => {
    if (cardIndex === -1) {
      return [];
    }
    return deck[cardIndex];
  });

const splitArrayToChunks = (hands: Hand[], size: number) => {
  if (!hands.length) {
    return [];
  }
  const chunksNumber = Math.ceil(hands.length / size);
  const chunksArray = Array(chunksNumber);
  return [...chunksArray].map((_, index) => {
    return hands.slice(index * size, (index + 1) * size);
  });
};

export default {
  splitArrayToChunks,
  getCombinations,
  getPercentage,
  getCardsFromIndices,
};
