import { ReactNode } from "react";

type ButtonProps = {
  handleClick: () => void;
  isDisabled: boolean;
  children: ReactNode;
};

const Button = ({ handleClick, isDisabled, children }: ButtonProps) => {
  return (
    <button
      disabled={isDisabled}
      onClick={handleClick}
      className="w-full bg-[#004e61] hover:bg-[#007c7b] text-white font-bold py-2 px-4 border border-[#007c7b] rounded-lg
        disabled:bg-[#004e61]/90 disabled:text-gray-500 "
    >
      {children}
    </button>
  );
};

export default Button;
