import Typography from "../../typography";
import CardSlot from "../cardSlot";
import C from "./constants";

const Player = ({ player, position }: PlayerProps) => {
  return (
    <div className="flex-col">
      <div className="flex flex-row m-2">
        {player.map((card, index) => (
          <CardSlot
            key={index}
            position={position}
            slotIndex={index}
            cardIndex={card.index}
          />
        ))}
      </div>
      <Typography fontColor="player" fontSize="default">
        {C.PLAYER_NAME[position]}
      </Typography>
    </div>
  );
};

export default Player;
