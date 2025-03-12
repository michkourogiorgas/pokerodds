type SuitToColor = Record<string, string>;

const TEXT_COLOR: SuitToColor = {
  hearts: "text-red-600",
  spades: "text-white",
  clubs: "text-green-500",
  diamonds: "text-[#009ef6]",
};

const BORDER_COLOR: SuitToColor = {
  hearts: "border-red-600",
  spades: "border-white",
  clubs: "text-green-500",
  diamonds: "border-[#009ef6]",
};

const BG_COLOR: SuitToColor = {
  hearts: "bg-[#731C16]",
  spades: "bg-[#393939]",
  clubs: "bg-[#007c7b]",
  diamonds: "bg-[#004e61]",
};

const SUIT_SYMBOL: SuitToColor = {
  hearts: "after:content-['♥']",
  spades: "after:content-['♠']",
  clubs: "after:content-['♣']",
  diamonds: "after:content-['♦']",
};

const NO_OPACITY: string = "opacity-100";

const OPACITY: string = "opacity-30";

export default {
  BG_COLOR,
  TEXT_COLOR,
  BORDER_COLOR,
  SUIT_SYMBOL,
  NO_OPACITY,
  OPACITY,
};
