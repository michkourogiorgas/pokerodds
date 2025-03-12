const suits: string[] = ["spades", "hearts", "clubs", "diamonds"];

const values: string[] = ["A", "K", "Q", "J", "10", "9", "8", "7", "6"];

const cardSlot: number[] = [0, 0];

const table = {
  villain_1: [-1, -1],
  villain_2: [-1, -1],
  villain_3: [-1, -1],
  villain_4: [-1, -1],
  villain_5: [-1, -1],
  hero: [-1, -1],
  community: [-1, -1, -1, -1, -1],
};

export default {
  cardSlot,
  suits,
  values,
  table,
};
