import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import useMaskedInput from './useMaskedInput';

function App() {
  const mask = "((9)-(9)-(9)-(9))";

  const [maskedValue, value, updateInput] = useMaskedInput({mask,"defaultValue":""});
  return (
    <div>
      <input
        type="text"
        value={maskedValue}
        onChange={(e)=>updateInput(e.target.value)}
        placeholder={mask}
      />
      <p>Masked Value: {maskedValue}</p>
      <p>Unmasked Value: {value}</p>
    </div>
  );
};

export default App;