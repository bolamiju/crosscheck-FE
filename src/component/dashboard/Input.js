import React, { useState } from "react";

function Input({ name }) {
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(count + 1);
    console.log("clicked count", count);
  };
  const decrement = () => {
    if (count >= 1) {
      setCount(count - 1);
    }
  };

  return (
    <div>
      <input value={count} />

      <button onClick={increment}> +</button>
      <button>{name}</button>
      <button onClick={decrement}> -</button>
    </div>
  );
}

export default Input;
