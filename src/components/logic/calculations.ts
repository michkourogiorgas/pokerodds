import C from "./constants";
import {
  straightFlushKickers,
  quadKickers,
  fullHouseKickers,
  flushKickers,
  straightKickers,
  threeOfAKindKickers,
  twoPairsKickers,
  onePairKickers,
  highCardKickers,
} from "./kickers";
import { FrequencyCounter, Hand } from "../../types";

const sortCards = (hand: Hand): Hand => {
  hand.sort((a, b) => {
    return C.CARD_STRENGTH[a.value] - C.CARD_STRENGTH[b.value];
  });
  return hand;
};

const areCardsConsecutive = (hand: Hand): boolean => {
  let previousCard;
  for (const card of hand) {
    if (
      previousCard &&
      C.CARD_STRENGTH[card.value] - C.CARD_STRENGTH[previousCard.value] !== 1
    ) {
      return false;
    }
    previousCard = card;
  }
  return true;
};

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
  const isStraight = areCardsConsecutive(hand);
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
  let kickers: number;
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
    kickers = 0;
  } else if (areCardsDifferent && isFlush && isStraight) {
    name = "Straight Flush";
    kickers = straightFlushKickers(hand);
  } else if (areCardsDifferent && isFlush) {
    name = "Flush";
    kickers = flushKickers(hand);
  } else if (areCardsDifferent && isStraight) {
    name = "Straight";
    kickers = straightKickers(hand);
  } else if (areCardsDifferent) {
    name = "High Card";
    kickers = highCardKickers(cardsFrequency);
  } else if (isQuads) {
    name = "Quads";
    kickers = quadKickers(cardsFrequency);
  } else if (isFullHouse) {
    name = "Full House";
    kickers = fullHouseKickers(cardsFrequency);
  } else if (isThreeOfAKind) {
    name = "Three of a Kind";
    kickers = threeOfAKindKickers(cardsFrequency);
  } else if (isTwoPair) {
    name = "Two Pairs";
    kickers = twoPairsKickers(cardsFrequency);
  } else {
    name = "One Pair";
    kickers = onePairKickers(cardsFrequency);
  }
  const value = C.HAND_STRENGTH[name];
  return { name, value, kickers };
};

const getHandStrength = (hand: Hand) => {
  const sortedHand = sortCards(hand);
  const { cardsFrequency, suitsFrequency } = prepareHand(hand);
  const handStrength = calculateHandStrength(
    sortedHand,
    cardsFrequency,
    suitsFrequency
  );
  return handStrength;
};

export default { getHandStrength };
