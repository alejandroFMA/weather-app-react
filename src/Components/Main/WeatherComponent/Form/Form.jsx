import { useState } from 'react';
import "./Form.css";

function Form ({onSearch}) {
  const [inputValue, setInputValue] = useState('');
  

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(inputValue);
    setInputValue('');
  };

  return (
    <form className="wForm" onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter city name"
        className='formName'
      />
      <button className="formButton" type="submit">Get Weather</button>
    </form>
    
   
  );
}

export default Form 