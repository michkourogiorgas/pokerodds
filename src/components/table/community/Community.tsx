import CardSlot from "../cardSlot/";
import { Player } from "../../../types";

const Community = ({ community }: { community: Player }) => {
  return (
    <div className={`flex gap-2 m-2 [grid-area:2_/_1_/_span_1_/_span_3]`}>
      {community.map((card, index) => {
        return (
          <CardSlot
            key={index}
            position="community"
            slotIndex={index}
            cardIndex={card.index}
          />
        );
      })}
    </div>
  );
};

export default Community;
