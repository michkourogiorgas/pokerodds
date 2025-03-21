import { Card, Hand, FrequencyCounter } from "../../types";
import C from "./constants";

const calculateKickersValue = (...kickers: string[]): number =>
  kickers.reduce(
    (accumulator, currentValue, currentIndex) =>
      accumulator +
      C.CARD_STRENGTH[currentValue] *
        Math.pow(10, kickers.length - 1 - currentIndex),

    0
  );

const sortKickers = (values: string[]) =>
  values.sort((a, b) => C.CARD_STRENGTH[b] - C.CARD_STRENGTH[a]);

const getCardByFrequency = (
  cardsFrequency: FrequencyCounter,
  frequency: number
) =>
  Object.keys(cardsFrequency).filter(
    (key) => cardsFrequency[key] === frequency
  );

const straightFlush = (hand: Hand): number =>
  C.CARD_STRENGTH[hand[hand.length - 1].value];

const quads = (cardsFrequency: FrequencyCounter): number => {
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

export default {
  straightFlush,
  quads,
  fullHouse,
  flush,
  straight,
  threeOfAKind,
  twoPairs,
  onePair,
  highCard,
};
