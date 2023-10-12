import { useEffect, useState } from "react";
import Navbar from "./Component/Navbar";
import { AiOutlineSearch } from "react-icons/ai";
import { AiFillPlusCircle } from "react-icons/ai";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import Contact from "./Component/Contact";
import AddUpdateContact from "./Component/AddUpdateContact";
import useDisclose from "./hooks/useDisclose";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NoContactFound from "./Component/NoContactFound";
const App = () => {
  const [contact, setContact] = useState([]);
  const { isOpen, onClose, onOpen } = useDisclose();
  useEffect(() => {
    const getContact = () => {
      try {
        const contactRef = collection(db, "new-contact");
        onSnapshot(contactRef, (snapshot) => {
          const contactList = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          console.log(contactList);
          setContact(contactList);
          return contactList;
        });
      } catch (error) {
        console.log(error);
      }
    };
    getContact();
  }, []);

  const filterContact = (e) => {
    const value = e.target.value;

    const contactRef = collection(db, "new-contact");
    onSnapshot(contactRef, (snapshot) => {
      const contactList = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      const searchContact = contactList.filter((contact) =>
        contact.name.toLowerCase().includes(value.toLowerCase())
      );
      setContact(searchContact);
      return searchContact;
    });
  };

  return (
    <>
      <div className="max-w-[470px] mx-auto">
        <Navbar />
        <div className="flex">
          <div className="flex flex-grow relative mx-4">
            <AiOutlineSearch className="text-white absolute w-[30px] h-[20px] top-[30px] left-2" />
            <input
              onChange={filterContact}
              type="text"
              placeholder="Search any thing"
              className="flex-grow text-white  w-[295px] h-[40px] py-[7px] px-[10px] pl-[35px] gap-[10px] rounded-xl border border-[white] bg-transparent mt-[20px]"
            />
          </div>
          <AiFillPlusCircle
            className="w-[52px] h-[52px] text-white mt-3 cursor-pointer"
            onClick={onOpen}
          />
        </div>
        {contact.length < 0 ? (
          <NoContactFound />
        ) : (
          contact.map((item) => {
            return <Contact key={item.id} item={item} />;
          })
        )}
      </div>
      <AddUpdateContact isOpen={isOpen} onClose={onClose} />
      <ToastContainer position="bottom-center" />
    </>
  );
};

export default App;
