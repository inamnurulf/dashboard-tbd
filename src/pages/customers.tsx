import { useState,useEffect } from "react";
import { Table } from "../components/customers/table";
import  Modal  from "../components/customers/modal";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([{['Customers Name']:' Loading...'}]);
  useEffect(() => {
    fetch('/api/customers')
        .then((res) => res.json())
        .then((data) => setRows(data))
        .catch((error) => console.log(error));
}, []);
  const [rowToEdit, setRowToEdit] = useState(null);
  const handleDeleteRow = (targetIndex: any) => {
    setRows(rows.filter((_, index) => index !== targetIndex));
  };

  const handleEditRow = (index:any) => {
    setRowToEdit(index);

    setModalOpen(true);
  };

  const handleSubmit = (newRow:never) => {
    rowToEdit === null
      ? setRows([...rows, newRow])
      : setRows(
          rows.map((currRow, index) => {
            if (index !== rowToEdit) return currRow;

            return newRow;
          })
        );
  };

  return (
    <>
      <div className="justify-center items-center py-20 lg:py-10 px-3 lg:px-28 h-screen overflow-y-scroll">
        <div className="text-4xl font-bold text-blue my-12 mx-auto">
          <h1 className="text-3xl sm:text-5xl font-bold mb-12 text-dark-blue">
            {" "}
            Good Reading Bookstore{" "}
          </h1>
        </div>
        <div>
          <Table
            rows={rows}
            deleteRow={handleDeleteRow}
            editRow={handleEditRow}
          />
          <button
            onClick={() => setModalOpen(true)}
            className="mt-4 mx-auto border-none bg-blue-600 text-white py-2 px-4 rounded-lg cursor-pointer shadow-md"
          >
            Add
          </button>
          {modalOpen && (
            <Modal
              closeModal={() => {
                setModalOpen(false);
                setRowToEdit(null);
              }}
              onSubmit={handleSubmit}
              defaultValue={rowToEdit !== null && rows[rowToEdit]}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
