import { useEffect, useState, useRef } from 'react'
import './App.css'
import Worker from './worker?worker';


function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const workerRef = useRef<Worker>();

  useEffect(() => {
    workerRef.current = new Worker();
    workerRef.current.onmessage = (e: unknown) => {
      setResult(e.data);
    };
    workerRef.current.postMessage('what a nice day');
  }, []);

  return (
    <>
      <label htmlFor="input-field">Input field:</label>
      <input
        type="text"
        id="input-field"
        placeholder="Enter text here"
        onKeyDown={(e) => setInput(e.currentTarget.value)}
        aria-label="Input field"
      />
      <span>{JSON.stringify(result)}</span>
      <button type="button" onClick={() => {
        workerRef.current?.postMessage(input);
      }} aria-label="Click me">Click me</button>
    </>
  );
}

export default App
