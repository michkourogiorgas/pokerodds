import C from "./constants";
import K from "./kickers";
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
  let kickers: number = 0;
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
  if (areCardsDifferent) {
    if (isFlush && isStraight && hasAce) {
      name = "Flush Royal";
    } else if (isFlush && isStraight) {
      name = "Straight Flush";
      kickers = K.straightFlush(hand);
    } else if (isFlush) {
      name = "Flush";
      kickers = K.flush(hand);
    } else if (isStraight) {
      name = "Straight";
      kickers = K.straight(hand);
    } else {
      name = "High Card";
      kickers = K.highCard(cardsFrequency);
    }
  } else {
    if (isQuads) {
      name = "Quads";
      kickers = K.quads(cardsFrequency);
    } else if (isFullHouse) {
      name = "Full House";
      kickers = K.fullHouse(cardsFrequency);
    } else if (isThreeOfAKind) {
      name = "Three of a Kind";
      kickers = K.threeOfAKind(cardsFrequency);
    } else if (isTwoPair) {
      name = "Two Pairs";
      kickers = K.twoPairs(cardsFrequency);
    } else {
      name = "One Pair";
      kickers = K.onePair(cardsFrequency);
    }
  }
  const value = C.HAND_STRENGTH[name];
  return { name, value, kickers };
};

const getHandStrength = (hand: Hand) => {
  const sortedHand = sortCards(hand);
  const { cardsFrequency, suitsFrequency } = prepareHand(sortedHand);
  return calculateHandStrength(sortedHand, cardsFrequency, suitsFrequency);
};

export { getHandStrength };
