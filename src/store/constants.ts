const suits: string[] = ["spades", "hearts", "clubs", "diamonds"];

const values: string[] = ["A", "K", "Q", "J", "10", "9", "8", "7", "6"];

const cardSlot: number[] = [0, 0];

const EMPTY_CARD = {
  suit: "",
  value: "",
  index: -1,
  isSelected: false,
};

const table = {
  villain1: [EMPTY_CARD, EMPTY_CARD],
  villain2: [EMPTY_CARD, EMPTY_CARD],
  villain3: [EMPTY_CARD, EMPTY_CARD],
  villain4: [EMPTY_CARD, EMPTY_CARD],
  villain5: [EMPTY_CARD, EMPTY_CARD],
  hero: [EMPTY_CARD, EMPTY_CARD],
  community: [EMPTY_CARD, EMPTY_CARD, EMPTY_CARD, EMPTY_CARD, EMPTY_CARD],
};

const VALIDATION = {
  villain1: [true, true],
  villain2: [true, true],
  villain3: [true, true],
  villain4: [true, true],
  villain5: [true, true],
  hero: [false, false],
  community: [true, true, true, true, true],
};

const INITIAL_RESULT_STATE = {
  ranking: {},
  winners: ["0%", "0%"],
  ties: ["0%", "0%"],
};

export default {
  cardSlot,
  suits,
  values,
  table,
  EMPTY_CARD,
  VALIDATION,
  INITIAL_RESULT_STATE,
};
