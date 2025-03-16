type TypographyAttributes = Record<string, string>;

const COLOR: TypographyAttributes = {
  default: "text-[#393939]",
  hero: "text-[#007c7b]",
  villains: "text-[#731C16]",
  player: "text-white",
};

const SIZE: TypographyAttributes = {
  default: "text-xs",
  title: "text-xl",
  results: "text-4xl",
};

export default {
  SIZE,
  COLOR,
};
