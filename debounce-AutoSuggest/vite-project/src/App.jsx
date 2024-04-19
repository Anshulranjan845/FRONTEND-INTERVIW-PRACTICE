import { useState } from "react";
import "./App.css";
import useDebounce from "./useDebounce";

function App() {
  // const url =`https://api.frontendeval.com/fake/food/${food}`;
  const [input, setInput] = useState([]);

  const handleInput = (e) => {
    console.log(e.target.value);
    setInput(e.target.value);
  };
  const debouncedValue = useDebounce(input);
  return (
    <div className="app">
      <h2>welcome back</h2>
      <div className="input-suggest">
        <input
          className="input-food"
          type="text"
          placeholder="enter food suggestion"
          value={input}
          onChange={handleInput}
        />
      </div>
      <div className="suggested-list"></div>
    </div>
  );
}

export default App;
