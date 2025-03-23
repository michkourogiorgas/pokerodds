import { Hand, FrequencyCounter, Players, Results } from "../../types";

const getCombinations = (
  cards: Hand,
  combinationLength: number,
  combinations: Hand[] = [],
  inProgressCombination: Hand = [],
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

const getCommunityCombinations = (deck: Hand, community: Hand): Hand[] => {
  if (community.length === 5) {
    return [community];
  }
  const remainingDeck = deck.filter((card) => !card.isSelected);
  const combinations = getCombinations(remainingDeck, 5 - community.length);
  const communities = combinations.flatMap((combination) =>
    getCombinations([...community, ...combination], 5)
  );
  return communities;
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
  key: string
): void => {
  object[key] = (object[key] ?? 0) + 1;
};

const filterActivePlayers = (table: Players): Players => {
  const players: Players = {};
  Object.entries(table).filter(([key, value]) => {
    if (value.length === 2 && value[0].index !== -1) {
      players[key] = value;
    }
  });
  return players;
};

const runWorker = (communities: Hand[], players: Players): Promise<Results> =>
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
  filterActivePlayers,
  splitArrayToChunks,
  runWorker,
  updateFrequencyCounter,
};
