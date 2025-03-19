import loader from "../../../public/img/load.gif";

const Modal = () => {
  return (
    <dialog
      open
      className="w-full h-full top-0 z-10 bg-gray-300/90 text-[#022436]"
    >
      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-90 h-50">
        <img src={loader} alt="loading..." className="w-50 h-50 ml-20" />
        <p>
          Calculations may take up to 20 seconds. Processing more than 8000000
          computations. To speed up the process, consider providing flop cards
          to reduce the number of possible scenarios.
        </p>
      </div>
    </dialog>
  );
};

export default Modal;
