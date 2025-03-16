import Typography from "../../typography";

const Row = ({ hand, hero, villains, fontSize }) => {
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
