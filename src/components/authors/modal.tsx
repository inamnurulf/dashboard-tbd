import React, { useState, useEffect } from "react";

const Modal = ({ closeModal, onSubmit, defaultValue }: any) => {
  const [formState, setFormState] = useState({
    ['Author Number']: "",
    ['Author Name']: "",
    ['Year Born']: "",
    ['Year Dead']: "",
  });
  const [errors, setErrors] = useState("");

  useEffect(() => {
    if (defaultValue) {
      setFormState(defaultValue);
    }
  }, [defaultValue]);

  const validateForm = () => {
    const name =formState['Author Name']
    const number =formState['Author Number']
    const born = formState['Year Born']
    const dead = formState['Year Dead']
    if (name && born && number && dead) {
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
          <label htmlFor="name" className="font-semibold">
            Name
          </label>
          <input
            name="Author Name"
            onChange={handleChange}
            value={formState['Author Name']}
            className="border border-black rounded-md p-1 text-base"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="Pages" className="font-semibold">
            Pages
          </label>
          <input
            name="Author Number"
            onChange={handleChange}
            value={formState['Author Number']}
            className="border border-black rounded-md p-1 text-base"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="title" className="font-semibold">
            Pages
          </label>
          <textarea
            name="Year Born"
            onChange={handleChange}
            value={formState['Year Born']}
            className="border border-black rounded-md p-1 text-base"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="Publication Year" className="font-semibold">
            Publication Year
          </label>
          <input
            name="Year Dead"
            onChange={handleChange}
            value={formState['Year Dead']}
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