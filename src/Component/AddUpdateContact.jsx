import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import Modal from "./Modal";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { db } from "../config/firebase";
import { toast } from "react-toastify";
import * as Yup from "yup";

const contactSchemaValidation = Yup.object().shape({
  name: Yup.string().required("Name is Required"),
  email: Yup.string().email("Invalid Email").required("Email is required"),
});

const AddUpdateContact = ({ isOpen, onClose, isUpdate, item }) => {
  const addContact = async (contact) => {
    try {
      const contactRef = collection(db, "new-contact");
      await addDoc(contactRef, contact);
      onClose();
      toast.success("Contact Add succesfully");
    } catch (error) {
      console.log(error);
    }
  };
  const updateContact = async (contact, id) => {
    try {
      const contactRef = doc(db, "new-contact", id);
      await updateDoc(contactRef, contact);
      onClose();
      toast.success("Contact Updated succesfully");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Formik
          validationSchema={contactSchemaValidation}
          initialValues={
            isUpdate
              ? {
                  name: item.name,
                  email: item.email,
                }
              : {
                  name: "",
                  email: "",
                }
          }
          onSubmit={(values) => {
            console.log(values);
            isUpdate ? updateContact(values, item.id) : addContact(values);
          }}
        >
          <Form>
            <div className="flex flex-col px-3">
              <div className="flex flex-col gap-1">
                <label htmlFor="name">Name</label>
                <Field name="name" className="h-10 border" />
                <div className="text-xs text-red-500">
                  <ErrorMessage name="name" />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="email">Email</label>
                <Field name="email" className="h-10 border" />
                <div className="text-xs text-red-500">
                  <ErrorMessage name="email" />
                </div>
              </div>
              <button className="self-end border bg-orange mt-3 px-3 py-1.5">
                {isUpdate ? "Update" : "Add"} Contact
              </button>
            </div>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
};

export default AddUpdateContact;
