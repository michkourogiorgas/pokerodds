import { Card, Combination, Hand } from "../../types";

export const getCombinations = (
  cards: Card[],
  combinationLength: number,
  combinations: Combination[] = [],
  inProgressCombination: Card[] = [],
  index: number = 0
): Combination[] => {
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

export default { getCombinations };
