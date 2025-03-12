import CardSlot from "../cardSlot";

const Player = ({ player, position }: PlayerProps) => {
  return (
    <div className="flex gap-2 m-2 w-9 h-12 border-[#21617F] rounded-sm">
      {player.map((cardIndex, index) => (
        <CardSlot
          key={index}
          position={position}
          slotIndex={index}
          cardIndex={cardIndex}
        />
      ))}
    </div>
  );
};

export default Player;
