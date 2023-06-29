import { useState,useEffect } from "react";
import { Table } from "../components/books/table";
import  Modal  from "../components/books/modal";
import { toast } from "react-toastify";


function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([{['Book Name']:' Loading...',['Book Number']: 'Loading...'}]);
  useEffect(() => {
    fetch('/api/books')
        .then((res) => res.json())
        .then((data) => setRows(data))
        .catch((error) => console.log(error));
}, []);
  const [rowToEdit, setRowToEdit] = useState(null);
  const handleDeleteRow = async (targetIndex: any) => {
    try {
      const response = await fetch(`/api/books/${rows[targetIndex]["Book Number"]}`, {
        method: 'DELETE'
      });
      if (response.ok){
        toast('Book deleted', { hideProgressBar: false, autoClose: 2000, type: 'warning' });
        setRows(rows.filter((_, index) => index !== targetIndex));
      }
      else{
        toast(`Error deleting a book: ${response.statusText}, can be violates foreign key`, { hideProgressBar: false, autoClose: 2000, type: 'error' });
      }

    } catch (error) {
      console.error('Error deleting book:', error);

    }
  };

  const handleEditRow = (index:any) => {
    setRowToEdit(index);

    setModalOpen(true);
  };

  const handleSubmit = async (newRow:never) => {
    if (rowToEdit === null){
      try {
        const response = await fetch('/api/books', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newRow),
        });
        if (response.ok) {
          const result = await response.json();
          toast('Book added', { hideProgressBar: false, autoClose: 2000, type: 'success' });

          console.log('Book added:', result);
        } else {
          toast(`Error adding book: ${response}`, { hideProgressBar: false, autoClose: 2000, type: 'error' });
          console.error('Error adding  book:', response.statusText);
        }
      } catch (error) {
        console.error('Error adding book:', error);
      }
    }
    else{
      try {
        const response = await fetch(`/api/books/${rows[rowToEdit]["Book Number"]}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newRow),
        });

        if (response.ok) {
          const result = await response.json();
          toast('Book updated', { hideProgressBar: false, autoClose: 2000, type: 'success' });

          // console.log('Book updated:', result);
        } else {
          console.error('Error updating book:', response.statusText);
          toast('Error updating book', { hideProgressBar: false, autoClose: 2000, type: 'error' });

        }
      } catch (error) {
        console.error('Error updating book:', error);
      }
    }
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
