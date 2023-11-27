import React, { useState } from "react";

const Counter: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [userInput, setUserInput] = useState<string>("");

  const handleClickPlus = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const handleClickMinus = () => {
    setCount((prevCount) => prevCount - 1);
  };

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setUserInput("");
      const num = Number(userInput);
      if (Number.isInteger(num)) setCount(num);
    }
  };

  return (
    <>
      <div>current count: {count}</div>
      <div>
        <div>count value input:</div>
        <input
          value={userInput}
          onChange={handleUserInput}
          onKeyDown={handleEnter}
        />
      </div>
      <div>
        <div>buttons:</div>
        <button onClick={handleClickPlus}>+</button>
        <button onClick={handleClickMinus}>-</button>
      </div>
    </>
  );
};

export default Counter;
