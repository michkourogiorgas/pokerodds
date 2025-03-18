import { mergeResults } from "./results";
import U from "./utils";
import { Card, PokerDataHand, Results, Table } from "../../types";

const runPokerOdds = async (deck: Card[], table: Table): Promise<Results> =>
  new Promise((resolve) => {
    const community = table.community.filter((card) => card.index);
    const communities = U.getCommunityCombinations(deck, community);
    const players = U.filterPlayers(table);
    const [split1, split2, split3, split4] = U.splitArrayToChunks(
      communities,
      communities.length / 4
    );

    Promise.all([
      U.runWorker(split1, players),
      U.runWorker(split2, players),
      U.runWorker(split3, players),
      U.runWorker(split4, players),
    ]).then((splitResults: PokerDataHand[]) => {
      const { hero, villain, ranking } = mergeResults(splitResults);
      const total = communities.length;
      const heroWinsPercentage = U.getPercentage(hero.wins, total);
      const villainsWinPercentage = U.getPercentage(villain.wins, total);
      const heroTiesPercentage = U.getPercentage(hero.ties, total);
      const villainsTiesPercentage = U.getPercentage(villain.ties, total);
      const rankingPercentage = U.getRankingPercentage(ranking, total);
      const results: Results = {
        winners: [heroWinsPercentage, villainsWinPercentage],
        ties: [heroTiesPercentage, villainsTiesPercentage],
        ranking: rankingPercentage,
      };
      resolve(results);
    });
  });

export { runPokerOdds };
