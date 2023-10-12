import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { FaRegUser } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { RiEditCircleLine } from "react-icons/ri";
import { db } from "../config/firebase";
import AddUpdateContact from "./AddUpdateContact";
import useDisclose from "../hooks/useDisclose";
import { toast } from "react-toastify";

const Contact = ({ item }) => {
  const { isOpen, onClose, onOpen } = useDisclose();
  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "new-contact", id));
      toast.success("Contact deleted succesfully");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div key={item.id}>
        <div className="flex flex-col gap-3 mt-4 mx-4">
          <div className="flex flex-grow  bg-yellow w-[360px] h-[64px] rounded-[10px]">
            <div className="mt-2 ml-1">
              <FaRegUser className="w-[40px] h-[40px] text-[black]" />
            </div>
            <div className="flex flex-col  mt-1 ml-5">
              <h1 className="text-[black] text-[20px]">{item.name}</h1>
              <p className="text-[black] text-[15px]">{item.email}</p>
            </div>
            <div className="flex items-center ml-10 gap-2 justify-end">
              <RiEditCircleLine
                onClick={onOpen}
                className="w-[10px] h-[10px] text-[green] cursor-pointer"
              />
              <MdDelete
                onClick={() => deleteContact(item.id)}
                className="w-[30px] h-[30px] text-purple  cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
      <AddUpdateContact
        item={item}
        isUpdate
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default Contact;
