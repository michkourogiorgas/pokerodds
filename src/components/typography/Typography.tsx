import { ReactNode } from "react";
import C from "./constants";

type TypographyProps = {
  fontColor: string;
  fontSize: string;
  children: ReactNode;
};

const Typography = ({ fontColor, fontSize, children }: TypographyProps) => {
  const color = C.COLOR[fontColor];
  const size = C.SIZE[fontSize];
  return (
    <p className={`${color} ${size} text-center font-sans font-medium `}>
      {children}
    </p>
  );
};

export default Typography;
