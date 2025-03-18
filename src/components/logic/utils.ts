import {
  Card,
  FrequencyCounter,
  Hand,
  Table,
  Players,
  PokerDataHand,
} from "../../types";

const getCombinations = (
  cards: Card[],
  combinationLength: number,
  combinations: Hand[] = [],
  inProgressCombination: Card[] = [],
  index: number = 0
) => {
  if (!combinationLength) {
    return [];
  }
  const isCombinationLengthReached = combinationLength == 1;
  for (let loopIndex = index; loopIndex < cards.length; loopIndex++) {
    const combination = [...inProgressCombination, cards[loopIndex]];

    if (isCombinationLengthReached) {
      combinations.push(combination);
    } else {
      getCombinations(
        cards,
        combinationLength - 1,
        combinations,
        combination,
        loopIndex + 1
      );
    }
  }
  return combinations;
};

const getCommunityCombinations = (deck: Card[], community: Card[]): Hand[] => {
  if (community.length === 5) {
    return [community];
  }

  const remainingDeck = deck.filter((card) => !card.isSelected);
  const combinations = getCombinations(remainingDeck, 5 - community.length);
  const communities = [];
  for (const combination of combinations) {
    communities.push(...getCombinations([...community, ...combination], 5));
  }
  return communities;
};

const getPercentage = (value: number, totalValue: number): string => {
  if (!value) return "0%";
  return ((value / totalValue) * 100).toFixed(2) + "%";
};

const getRankingPercentage = (ranking: FrequencyCounter, total: number) => {
  const rankingPercentage: Record<string, string> = {};
  Object.keys(ranking).forEach((key) => {
    rankingPercentage[key] = getPercentage(ranking[key], total);
  });
  return rankingPercentage;
};

const splitArrayToChunks = (communities: Hand[], size: number) => {
  const chunksNumber = Math.ceil(communities.length / size);
  const chunksArray = Array(chunksNumber);
  return [...chunksArray].map((_, index) => {
    return communities.slice(index * size, (index + 1) * size);
  });
};

const updateFrequencyCounter = (
  object: FrequencyCounter,
  key: string,
  value: number
): void => {
  object[key] = (object[key] ?? 0) + value;
};

const filterPlayers = (table: Table): Players => {
  const players: Players = {};
  Object.keys(table).forEach((key) => {
    if (table[key].length === 2 && table[key][0].index) {
      players[key] = table[key];
    }
  });
  return players;
};

const runWorker = (
  communities: Hand[],
  players: Players
): Promise<PokerDataHand> =>
  new Promise((resolve) => {
    const myWorker = new Worker(new URL("./worker.js", import.meta.url), {
      type: "module",
    });
    myWorker.onmessage = (event) => {
      resolve(event.data);
    };
    myWorker.postMessage({ communities, players });
  });

export default {
  getCombinations,
  getCommunityCombinations,
  getPercentage,
  getRankingPercentage,
  filterPlayers,
  splitArrayToChunks,
  runWorker,
  updateFrequencyCounter,
};
