import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";

function App() {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState('...')
  const [copystat, setCopystat] = useState(false)

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/sqlbuilder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputText)
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result)
        setResult(JSON.stringify(result));
        toast('Success', { hideProgressBar: false, autoClose: 2000, type: 'success' });

      } else {
        toast(`Grammatical error`, { hideProgressBar: false, autoClose: 2000, type: 'error' });
        console.error('error :', response.statusText);
      }
    } catch (error) {
      console.error('Error querying:', error);
    }
  };

  const handleChange = (e: any) => {
    setInputText(e.target.value);
  };

  const handleCopy = (e: any) => {
    e.preventDefault();
    navigator.clipboard.writeText('SELECT * FROM public."BOOK" ORDER BY "Book Number" ASC;')
      .then(() => {
        toast('Text copied successfully!', { hideProgressBar: false, autoClose: 2000, type: 'success' });
        setCopystat(true)
      })
      .catch((error) => {
        toast(`Error copying text:${error}`, { hideProgressBar: false, autoClose: 2000, type: 'error' });
      });
  };

  return (
    <div className="text-blue my-12 mx-auto mt-80 mx-5 flex flex-col justify-center max-h-20">
      <h1 className="text-3xl sm:text-5xl font-bold text-dark-blue">
        SQL Builders
      </h1>
      <div className=" flex flex-col m-5 w-[1000px]">
        <h1 className="font-bold">Input Query :</h1>
        <form onSubmit={handleSubmit}>
          <input className="border-2 border-black w-full h-8"
            type="text"
            value={inputText}
            onChange={handleChange}
            placeholder="Enter text"
          />
          <div className="text-sm text-slate-500">Example: SELECT * FROM public."BOOK" ORDER BY "Book Number" ASC;</div>
          <button type="button" onClick={handleCopy} className={`border-none py-2 px-4 rounded-lg cursor-pointer shadow-md m-5 ${copystat ? 'bg-blue-200 text-black' : 'bg-blue-600 text-white'}`}>
            {copystat ? 'Copied!' : 'Copy'}
          </button>
          <button type="submit" className="border-none bg-blue-600 text-white py-2 px-4 rounded-lg cursor-pointer shadow-md m-5">Submit</button>
        </form>
      </div>
      <div className="flex flex-col m-5 w-[1000px]">
        <h1 className="font-bold">Result :</h1>
        <div className="border-2 border-black w-full h-full flex flex-wrap overflow-y-scroll">{result}</div>
      </div>
    </div>
  )
}

export default App;