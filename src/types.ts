type Card = {
  suit: string;
  value: string;
  index: string;
  isSelected: boolean;
};

type Player = Card[];

type Players = Record<string, Player>;

type Table = Record<string, Player>;

type Hand = Card[];

type HandAssesment = {
  name: string;
  value: number;
  kickers: number;
  player: string;
};

type FrequencyCounter = Record<string, number>;

type PokerDataHand = {
  winners: FrequencyCounter;
  ties: FrequencyCounter;
  ranking: FrequencyCounter;
};

type TotalPokerData = {
  hero: FrequencyCounter;
  villain: FrequencyCounter;
  ranking: FrequencyCounter;
};

type Results = {
  winners: string[];
  ties: string[];
  ranking: Record<string, string>;
};

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
  Hand,
  HandAssesment,
  FrequencyCounter,
  Player,
  Players,
  PokerDataHand,
  Results,
  Table,
  TotalPokerData,
};
