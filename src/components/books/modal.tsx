import React, { useState, useEffect } from "react";

const Modal = ({ closeModal, onSubmit, defaultValue }: any) => {
  const [formState, setFormState] = useState({
    ['Book Number']: "",
    ['Book Name']: "",
    ['Publication Year']: "",
    ['Publisher Name']: "",
    Pages: "",
  });
  const [errors, setErrors] = useState("");

  useEffect(() => {
    if (defaultValue) {
      setFormState(defaultValue);
    }
  }, [defaultValue]);

  const validateForm = () => {
    const {  Pages}: any = formState;
    const name =formState['Book Name']
    const number =formState['Book Number']
    const year = formState['Publication Year']
    const pubname = formState['Publisher Name']
    if (name && Pages && number && year && pubname) {
      setErrors("");
      return true;
    } else {
      const errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (!value) {
          errorFields.push(key);
        }
      }
      setErrors(errorFields.join(", "));
      return false;
    }
  }
  const handleChange = (e: any) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit(formState);

    closeModal();
  };


return (
  <div
    className="fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-40"
    onClick={(e: any) => {
      if (
        e.target.className ===
        "fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-40"
      )
        closeModal();
    }}
  >
    <div className="bg-white p-8 rounded-md w-64">
      <form>
        <div className="flex flex-col mb-4">
          <label htmlFor="Book name" className="font-semibold">
            Name
          </label>
          <input
            name="Book Name"
            onChange={handleChange}
            value={formState['Book Name']}
            className="border border-black rounded-md p-1 text-base"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="Pages" className="font-semibold">
            Pages
          </label>
          <input
            name="Pages"
            onChange={handleChange}
            value={formState.Pages}
            className="border border-black rounded-md p-1 text-base"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="Book Number" className="font-semibold">
            Book Number
          </label>
          <textarea
            name="Book Number"
            onChange={handleChange}
            value={formState['Book Number']}
            className="border border-black rounded-md p-1 text-base"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="Publication Year" className="font-semibold">
            Publication Year
          </label>
          <input
            name="Publication Year"
            onChange={handleChange}
            value={formState['Publication Year']}
            className="border border-black rounded-md p-1 text-base"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="Publisher Name" className="font-semibold">
            Publisher Name
          </label>
          <input
            name="Publisher Name"
            onChange={handleChange}
            value={formState['Publisher Name']}
            className="border border-black rounded-md p-1 text-base"
          />
           
        </div>
        {errors && <div className="error">{`Please include: ${errors}`}</div>}
        <button
          type="submit"
          className="mt-4 border-none bg-blue-600 text-white py-2 px-4 rounded-lg cursor-pointer shadow-md"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  </div>
)}
export default Modal