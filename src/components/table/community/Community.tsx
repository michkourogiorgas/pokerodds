import CardSlot from "../cardSlot/";

const Community = ({ community }: number[]) => {
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
