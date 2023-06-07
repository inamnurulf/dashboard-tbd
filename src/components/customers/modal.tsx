import React, { useState, useEffect } from "react";

const Modal = ({ closeModal, onSubmit, defaultValue }: any) => {
  const [formState, setFormState] = useState({
    ['Customer Number']: "",
    ['Customer Name']: "",
    ['Street']: "",
    ['City']: "",
    ['State']: "",
    ['Country']: "",
  });
  const [errors, setErrors] = useState("");

  useEffect(() => {
    if (defaultValue) {
      setFormState(defaultValue);
    }
  }, [defaultValue]);

  const validateForm = () => {
    const name =formState['Customer Name']
    const number =formState['Customer Number']
    const street = formState['Street']
    const city = formState['City']
    const state = formState['State']
    const country = formState['Country']


    if (name && street && number && city && state && country) {
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
            name="Customer Name"
            onChange={handleChange}
            value={formState['Customer Name']}
            className="border border-black rounded-md p-1 text-base"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="Customer Number" className="font-semibold">
            Customer Number
          </label>
          <input
            name="Customer Number"
            onChange={handleChange}
            value={formState['Customer Number']}
            className="border border-black rounded-md p-1 text-base"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="Street" className="font-semibold">
            Street
          </label>
          <textarea
            name="Street"
            onChange={handleChange}
            value={formState['Street']}
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
          <label htmlFor="State" className="font-semibold">
            State
          </label>
          <input
            name="State"
            onChange={handleChange}
            value={formState['State']}
            className="border border-black rounded-md p-1 text-base"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="Country" className="font-semibold">
            Country
          </label>
          <input
            name="Country"
            onChange={handleChange}
            value={formState['Country']}
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