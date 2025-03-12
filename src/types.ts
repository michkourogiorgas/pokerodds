type Card = {
  suit: string;
  value: string;
};

type Combination = Card[];

type Hand = [Card, Card, Card, Card, Card];

type Player = [Card, Card];

type HandAssesment = { name: string; value: number; kickers: number };

type FrequencyCounter = Record<string, number>;

// UI types

type UICard = Card & { index: number; isSelected: boolean };

type UIPlayer = [UICard, UICard];

type CardSlot = {
  playerId: number;
  slotId: number;
  cardId: string;
};

export {
  Card,
  CardSlot,
  UICard,
  UIPlayer,
  Combination,
  Hand,
  HandAssesment,
  FrequencyCounter,
  Player,
};
