import { ReactNode } from "react";

type ButtonProps = {
  handleClick: () => void;
  children: ReactNode;
};

const Button = ({ handleClick, children }: ButtonProps) => {
  return (
    <button
      onClick={handleClick}
      className="w-full bg-[#004e61] hover:bg-[#007c7b] text-white font-bold py-2 px-4 border border-[#007c7b] rounded-lg"
    >
      {children}
    </button>
  );
};

export default Button;
