import { Hand, UICard } from "../../types";
import U from "./utils";

const getCommunityCombinations = (
  deck: UICard[],
  community: UICard[]
): Hand[] => {
  if (community.length === 5) {
    return [community];
  }

  const remainingDeck = deck.filter((card) => !card.isSelected);
  const combinations = U.getCombinations(remainingDeck, 5 - community.length);
  const communities = [];
  for (const combination of combinations) {
    communities.push(...U.getCombinations([...community, ...combination], 5));
  }
  return communities;
};

export { getCommunityCombinations };

// UICARD to Card
