import Typography from "../../typography";

type RowProps = {
  hand: string;
  hero: string;
  villains: string;
  fontSize: string;
};

const Row = ({ hand, hero, villains, fontSize }: RowProps) => {
  return (
    <>
      <Typography fontColor="default" fontSize={fontSize}>
        {hand}
      </Typography>
      <Typography fontColor="hero" fontSize={fontSize}>
        {hero}
      </Typography>
      {villains && (
        <Typography fontColor="villains" fontSize={fontSize}>
          {villains}
        </Typography>
      )}
    </>
  );
};

export default Row;
