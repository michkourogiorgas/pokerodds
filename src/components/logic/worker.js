import { getWinners } from "./results";
self.onmessage = function (message) {
  const { communities, heroCards, villains } = message.data;
  const mike = getWinners(communities, [heroCards, ...villains]);

  self.postMessage(mike);
};
