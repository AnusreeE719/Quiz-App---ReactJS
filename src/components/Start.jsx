/* eslint-disable react/prop-types */

import { useRef } from "react";
import "./Start.css";

const Start = ({ setUsername }) => {
  const inputRef = useRef();

  const handleStart = () => {
    const inputValue = inputRef.current.value;
    if (inputValue) {
      setUsername(inputValue);
    }
  };
  return (
    <div className="start-container">
      <div className="start">
        <input
          type="text"
          ref={inputRef}
          className="startInput"
          placeholder="Enter your name"
        />
        <button className="start-btn" onClick={handleStart}>
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default Start;
