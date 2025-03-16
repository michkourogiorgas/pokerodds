import {
  Card,
  Combination,
  FrequencyCounter,
  Hand,
  Player,
  UICard,
} from "../../types";
import U from "./utils";
import { comparePlayers, getStongerHandPerPlayer } from "./comparisons";
import { getCommunityCombinations } from "./community";
// import workerScript from "./Worker";
import MyWorker from "./worker?worker";

// const getCommunityCombinations = (
//   community: Card[],
//   remainingDeckCombinations: Combination[]
// ): Hand[] => {
//   if (!remainingDeckCombinations.length) {
//     return [community];
//   }
//   const communityCombinations = [];
//   for (const deckCombination of remainingDeckCombinations) {
//     communityCombinations.push(
//       ...U.getCombinations([...community, ...deckCombination], 5)
//     );
//   }
//   return communityCombinations;
// };

// const countFrequency = (counterObj, counted) => {
//   return {counterObj[counted]: counterObj[counted] + 1 || 1};
// };

export const getWinners = (
  communityCombinations: Hand[],
  players: Player[]
) => {
  const winners: FrequencyCounter = {};
  const ties: FrequencyCounter = {};
  const ranking: FrequencyCounter = {};
  communityCombinations.forEach((community) => {
    const bestHandPerPlayer = getStongerHandPerPlayer(community, players);
    const winner = comparePlayers(bestHandPerPlayer);

    if (winner.length === 1) {
      winners[winner[0]] = winners[winner[0]] + 1 || 1;
      // winners = countFrequency(winners, winner[0]);
    } else {
      for (const tie of winner) {
        // ties = countFrequency(ties, tie);
        ties[tie] = ties[tie] + 1 || 1;
      }
    }
    // ranking = countFrequency(ranking, bestHandPerPlayer[0].name);
    ranking[bestHandPerPlayer[0].name] =
      ranking[bestHandPerPlayer[0].name] + 1 || 1;
  });
  return { winners, ties, ranking };
};

const mike = (community) =>
  new Promise((resolve) => {
    const start = performance.now();

    const myWorker = new Worker(new URL("./worker.js", import.meta.url), {
      type: "module",
    });
    myWorker.onmessage = (e) => {
      const end = performance.now();
      console.log(`Calculate communit ${end - start} milliseconds`);
      resolve(e.data);
    };
    myWorker.postMessage(community);
  });

const aggregateData = (data) => {
  console.log(data);
  return data.reduce(
    (accumulator, currentValue) => {
      Object.keys(currentValue.winners).forEach((key) => {
        if (key === "0") {
          accumulator.heroWins =
            (accumulator.heroWins || 0) + currentValue.winners[key];
        } else {
          accumulator.villainWins =
            (accumulator.villainWins || 0) + currentValue.winners[key];
        }
      });

      Object.keys(currentValue.ties).forEach((key) => {
        if (key === "0") {
          accumulator.heroTies =
            (accumulator.heroTies || 0) + currentValue.ties[key];
        } else {
          accumulator.villainTies =
            (accumulator.villainTies || 0) + currentValue.ties[key];
        }
      });

      Object.keys(currentValue.ranking).forEach((rank) => {
        accumulator.ranking[rank] =
          (accumulator.ranking[rank] || 0) + currentValue.ranking[rank];
      });

      return accumulator;
    },
    {
      heroWins: 0,
      villainWins: 0,
      heroTies: 0,
      villainTies: 0,
      ranking: {},
    }
  );
};

const getResult = async (deck: UICard[], table) => {
  const community = U.getCardsFromIndices(deck, table.community);
  const heroCards = U.getCardsFromIndices(deck, table.hero);
  const villain1Cards = U.getCardsFromIndices(deck, table.villain_1);
  const villain2Cards = U.getCardsFromIndices(deck, table.villain_2);
  const villain3Cards = U.getCardsFromIndices(deck, table.villain_3);
  const villain4Cards = U.getCardsFromIndices(deck, table.villain_4);
  const villain5Cards = U.getCardsFromIndices(deck, table.villain_5);
  const villains = [];

  ////////////////////////////
  villain1Cards.length && villains.push(villain1Cards);
  villain2Cards.length && villains.push(villain2Cards);
  villain3Cards.length && villains.push(villain3Cards);
  villain4Cards.length && villains.push(villain4Cards);
  villain5Cards.length && villains.push(villain5Cards);
  console.log(villains);

  ///////////////////////////////

  const communities = getCommunityCombinations(deck, community);

  const splitCommunities = U.splitArrayToChunks(
    communities,
    communities.length / 4
  );

  await Promise.all([
    mike({ communities: splitCommunities[0], heroCards, villains }),
    mike({ communities: splitCommunities[1], heroCards, villains }),
    mike({ communities: splitCommunities[2], heroCards, villains }),
    mike({ communities: splitCommunities[3], heroCards, villains }),
  ]).then((values) => {
    const { heroWins, villainWins, heroTies, villainTies, ranking } =
      aggregateData(values);
    const total = communities.length;
    const heroWinsPercentage = U.getPercentage(heroWins, total);
    const villainsWinPercentage = U.getPercentage(villainWins, total);
    const heroTiesPercentage = U.getPercentage(heroTies, total);
    const villainsTiesPercentage = U.getPercentage(villainTies, total);

    return {
      winners: [heroWinsPercentage, villainsWinPercentage],
      ties: [heroTiesPercentage, villainsTiesPercentage],
      ranking: ranking,
    };
  });
};

export { getResult };
