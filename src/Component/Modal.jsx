import { FaSkullCrossbones } from "react-icons/fa";

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <>
          <div className="relative z-50 flex flex-col mt-[30px] min-h-[250px] w-[80%] bg-white m-4 rounded-[10px]">
            <div className="flex justify-end">
              <FaSkullCrossbones
                className="cursor-pointer text-[40px] mr-3 mt-2"
                onClick={onClose}
              />
            </div>
            {children}
          </div>
          <div
            onClick={onClose}
            className="cursor-pointer backdrop-blur h-screen w-screen absolute top-0 z-40"
          />
        </>
      )}
    </>
  );
};

export default Modal;
