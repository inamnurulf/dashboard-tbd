import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";

function App() {
        const [inputText, setInputText] = useState('');
        const [result,setResult] =useState('...')

        const handleSubmit =async  (e:any) => {
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
                  setResult(JSON.stringify(result));
                  toast('Book added', { hideProgressBar: false, autoClose: 2000, type: 'success' });
        
                  console.log('Book added:', result);
                } else {
                  toast(`Error adding book: ${response}`, { hideProgressBar: false, autoClose: 2000, type: 'error' });
                  console.error('Error adding  book:', response.statusText);
                }
              } catch (error) {
                console.error('Error adding book:', error);
              }
        };

        const handleChange = (e: any) => {
            setInputText(e.target.value);
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
                    <button type="submit" className="border-none bg-blue-600 text-white py-2 px-4 rounded-lg cursor-pointer shadow-md m-5">Submit</button>
                </form>
            </div>
            <div className="flex flex-col m-5 w-[1000px]">
            <h1 className="font-bold">Result :</h1>
            <div className="border-2 border-black w-full h-8">{result}</div>
            </div>
        </div>
        )
}

export default App;