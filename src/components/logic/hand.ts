import C from "./constants";
import { getKickersValue } from "./kickers";
import { Card, FrequencyCounter, Hand } from "../../types";

const sortCards = (hand: Hand): Hand => {
  hand.sort((a: Card, b: Card) => {
    return C.CARD_STRENGTH[a.value] - C.CARD_STRENGTH[b.value];
  });
  return hand;
};

const areConsecutive = (hand: Hand): boolean =>
  hand.every(
    (card: Card, index: number) =>
      !index ||
      C.CARD_STRENGTH[card.value] - C.CARD_STRENGTH[hand[index - 1].value] === 1
  );

const prepareHand = (hand: Hand) => {
  const cardsFrequency: FrequencyCounter = {};
  const suitsFrequency: FrequencyCounter = {};
  for (const card of hand) {
    const { suit, value } = card;
    cardsFrequency[value] = cardsFrequency[value] + 1 || 1;
    suitsFrequency[suit] = suitsFrequency[suit] + 1 || 1;
  }
  return { cardsFrequency, suitsFrequency };
};

const assessHand = (
  hand: Hand,
  cardsFrequency: FrequencyCounter,
  suitsFrequency: FrequencyCounter
) => {
  const areCardsDifferent: boolean = Object.keys(cardsFrequency).length === 5;
  const isFlush = Object.values(suitsFrequency).length === 1;
  const isStraight = areConsecutive(hand);
  const hasAce = !!cardsFrequency["A"];
  const isQuads = Object.values(cardsFrequency).some((value) => value === 4);
  const isFullHouse =
    Object.values(cardsFrequency).some((value) => value === 3) &&
    Object.values(cardsFrequency).some((value) => value === 2);
  const isThreeOfAKind = Object.values(cardsFrequency).some(
    (value) => value === 3
  );
  const isTwoPair = Object.keys(cardsFrequency).length === 3;
  return {
    areCardsDifferent,
    isFlush,
    isStraight,
    hasAce,
    isQuads,
    isFullHouse,
    isThreeOfAKind,
    isTwoPair,
  };
};

const calculateHandStrength = (
  hand: Hand,
  cardsFrequency: FrequencyCounter,
  suitsFrequency: FrequencyCounter
) => {
  let name: string = "";
  const {
    areCardsDifferent,
    isFlush,
    isStraight,
    hasAce,
    isQuads,
    isFullHouse,
    isThreeOfAKind,
    isTwoPair,
  } = assessHand(hand, cardsFrequency, suitsFrequency);
  if (areCardsDifferent && isFlush && isStraight && hasAce) {
    name = "Flush Royal";
  } else if (areCardsDifferent && isFlush && isStraight) {
    name = "Straight Flush";
  } else if (areCardsDifferent && isFlush) {
    name = "Flush";
  } else if (areCardsDifferent && isStraight) {
    name = "Straight";
  } else if (areCardsDifferent) {
    name = "High Card";
  } else if (isQuads) {
    name = "Quads";
  } else if (isFullHouse) {
    name = "Full House";
  } else if (isThreeOfAKind) {
    name = "Three of a Kind";
  } else if (isTwoPair) {
    name = "Two Pairs";
  } else {
    name = "One Pair";
  }
  const kickers = getKickersValue(name, hand, cardsFrequency);
  const value = C.HAND_STRENGTH[name];
  return { name, value, kickers };
};

const getStrength = (hand: Hand) => {
  const sortedHand = sortCards(hand);
  const { cardsFrequency, suitsFrequency } = prepareHand(sortedHand);
  return calculateHandStrength(sortedHand, cardsFrequency, suitsFrequency);
};

export { getStrength };
