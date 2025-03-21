type Card = {
  suit: string;
  value: string;
  index: number;
  isSelected: boolean;
  isHoverable?: boolean;
};

type Player = Card[];

type Players = Record<string, Player>;

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

type ValidCards = boolean[];

type ValidationTable = Record<string, ValidCards>;

export {
  Card,
  Hand,
  HandAssesment,
  FrequencyCounter,
  Player,
  Players,
  PokerDataHand,
  Results,
  TotalPokerData,
  ValidationTable,
  ValidCards,
};
