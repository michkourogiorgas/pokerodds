import { Card, Combination, FrequencyCounter, Hand, Player } from "../../types";
import U from "./utils";
import { comparePlayers } from "./comparisons";

const getCommunityCombinations = (
  community: Card[],
  remainingDeckCombinations: Combination[]
): Hand[] => {
  const communityCombinations = [];
  for (const deckCombination of remainingDeckCombinations) {
    communityCombinations.push(
      ...U.getCombinations([...community, ...deckCombination], 5)
    );
  }
  return communityCombinations;
};

const getWinners = (communityCombinations: Hand[], players: Player[]) => {
  const winners: FrequencyCounter = {};
  const ties: FrequencyCounter = {};
  communityCombinations.forEach((community) => {
    const winner = comparePlayers(community, players);
    if (winner.length === 1) {
      winners[winner[0]] = winners[winner[0]] + 1 || 1;
    } else {
      for (const tie of winner) {
        ties[tie] = ties[tie] + 1 || 1;
      }
    }
  });
  return { winners, ties };
};

const getResult = (deck: Card[], community: Card[], players: Player[]) => {
  const remainingDeckCombinations = U.getCombinations(
    deck,
    5 - community.length
  );

  const communityCombinations = getCommunityCombinations(
    community,
    remainingDeckCombinations
  );

  const { winners, ties } = getWinners(communityCombinations, players);

  return 1;
};

export { getResult };
