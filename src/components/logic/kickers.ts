import C from "./constants";
import { Card, Hand, FrequencyCounter } from "../../types";

const calculateKickersValue = (...kickers: string[]): number =>
  kickers.reduce(
    (accumulator, currentValue, currentIndex) =>
      accumulator +
      C.CARD_STRENGTH[currentValue] *
        Math.pow(10, kickers.length - 1 - currentIndex),

    0
  );

const sortKickers = (values: string[]) => {
  values.sort((a, b) => {
    return C.CARD_STRENGTH[b] - C.CARD_STRENGTH[a];
  });
  return values;
};

const getCardByFrequency = (
  cardsFrequency: FrequencyCounter,
  frequency: number
) =>
  Object.keys(cardsFrequency).filter((key) => {
    if (cardsFrequency[key] === frequency) return key;
  });

const straightFlush = (hand: Hand): number =>
  C.CARD_STRENGTH[hand[hand.length - 1].value];

const quad = (cardsFrequency: FrequencyCounter): number => {
  const quads = getCardByFrequency(cardsFrequency, 4);
  const highCard = getCardByFrequency(cardsFrequency, 1);
  return calculateKickersValue(...quads, ...highCard);
};

const fullHouse = (cardsFrequency: FrequencyCounter): number => {
  const threeOfAKind = getCardByFrequency(cardsFrequency, 3);
  const pair = getCardByFrequency(cardsFrequency, 2);
  return calculateKickersValue(...threeOfAKind, ...pair);
};

const flush = (hand: Hand): number =>
  hand.reduce(
    (accumulator: number, currentValue: Card) =>
      accumulator + C.CARD_STRENGTH[currentValue.value],
    0
  );

const straight = (hand: Hand): number =>
  C.CARD_STRENGTH[hand[hand.length - 1].value];

const threeOfAKind = (cardsFrequency: FrequencyCounter): number => {
  const threeOfAKind = getCardByFrequency(cardsFrequency, 3);
  const highCards = getCardByFrequency(cardsFrequency, 1);
  const sortedHighCards = sortKickers(highCards);
  return calculateKickersValue(...threeOfAKind, ...sortedHighCards);
};

const twoPairs = (cardsFrequency: FrequencyCounter): number => {
  const pairs = getCardByFrequency(cardsFrequency, 2);
  const sortedPairs = sortKickers(pairs);
  const highCard = getCardByFrequency(cardsFrequency, 1);
  return calculateKickersValue(...sortedPairs, ...highCard);
};

const onePair = (cardsFrequency: FrequencyCounter): number => {
  const pair = getCardByFrequency(cardsFrequency, 2);
  const highCards = getCardByFrequency(cardsFrequency, 1);
  const sortedHighCards = sortKickers(highCards);
  return calculateKickersValue(...pair, ...sortedHighCards);
};

const highCard = (cardsFrequency: FrequencyCounter): number => {
  const sortedHighCards = sortKickers(Object.keys(cardsFrequency));
  return calculateKickersValue(...sortedHighCards);
};

const getKickersValue = (
  name: string,
  hand: Hand,
  cardsFrequency: FrequencyCounter
): number => {
  const mapHandToKickers: Record<string, number> = {
    "Flush Royal": 0,
    "Straight Flush": straightFlush(hand),
    Quads: quad(cardsFrequency),
    "Full House": fullHouse(cardsFrequency),
    Flush: flush(hand),
    Straight: straight(hand),
    "Three of a Kind": threeOfAKind(cardsFrequency),
    "Two Pairs": twoPairs(cardsFrequency),
    "One Pair": onePair(cardsFrequency),
    "High Card": highCard(cardsFrequency),
  };
  return mapHandToKickers[name];
};

export { getKickersValue };
