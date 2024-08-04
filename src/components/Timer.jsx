/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import "./Timer.css";

const Timer = ({ setTimeOver, isPause, setIsPause, questionNumber }) => {
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    if (timer === 0) return setTimeOver(true);
    const interval = setInterval(() => {
      if (!isPause) {
        setTimer((previous) => previous - 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [setTimeOver, timer, isPause]);

  useEffect(() => {
    setTimer(30);
    setIsPause(false);
  }, [questionNumber]);

  return <div className="timer">{timer}</div>;
};

export default Timer;
