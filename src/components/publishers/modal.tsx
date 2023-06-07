import React, { useState, useEffect } from "react";

const Modal = ({ closeModal, onSubmit, defaultValue }: any) => {
  const [formState, setFormState] = useState({
    ['Publisher Name']: "",
    ['City'] : "",
    ['Country']: "",
    ['Telephone']: "",
    ['Year Founded']: "",
  });
  const [errors, setErrors] = useState("");

  useEffect(() => {
    if (defaultValue) {
      setFormState(defaultValue);
    }
  }, [defaultValue]);

  const validateForm = () => {
    const name =formState['Publisher Name']
    const city =formState['City']
    const country = formState['Country']
    const year = formState['Year Founded']
    if (name && city && year && country) {
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
          <label htmlFor="Publisher Name" className="font-semibold">
            Name
          </label>
          <input
            name="Publisher Name"
            onChange={handleChange}
            value={formState['Publisher Name']}
            className="border border-black rounded-md p-1 text-base"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="City" className="font-semibold">
            City
          </label>
          <input
            name="City"
            onChange={handleChange}
            value={formState['City']}
            className="border border-black rounded-md p-1 text-base"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="Country" className="font-semibold">
            Country
          </label>
          <textarea
            name="Country"
            onChange={handleChange}
            value={formState['Country']}
            className="border border-black rounded-md p-1 text-base"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="Telephone" className="font-semibold">
            Telephone
          </label>
          <input
            name="Telephone"
            onChange={handleChange}
            value={formState['Telephone']}
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