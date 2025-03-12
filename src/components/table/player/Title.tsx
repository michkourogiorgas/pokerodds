const Title = ({ text, className = "" }) => {
  return (
    <div
      className={`text-lg font-semibold text-gray-800 flex items-center justify-center${className}`}
    >
      {text}
    </div>
  );
};

export default Title;
