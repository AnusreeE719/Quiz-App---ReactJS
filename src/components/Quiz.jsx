/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import "./Quiz.css";
import play from "../assets/play.mp3";
import correct from "../assets/correct.mp3";
import wrong from "../assets/wrong.mp3";

import useSound from "use-sound";

const Quiz = ({
  Questions,
  setIsPause,
  setTimeOver,
  questionNumber,
  setQuestionNumber,
}) => {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerClassname, setAnswerClassname] = useState("selectedOption");
  const [correctOption, setCorrectOption] = useState(null)

  const [letsPlay] = useSound(play);
  const [correctAnswer] = useSound(correct);
  const [wrongAnswer] = useSound(wrong);

  useEffect(() => {
    letsPlay();
  }, [letsPlay]);


  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  const goToNextQuestion = () => {
    setQuestionNumber((previous) => previous + 1);
    setSelectedAnswer(null);
    setCorrectOption(null)
  };

  const stopGame = () => {
    setTimeOver(true);
  };

  const highLightAnswer = () => {
    const correctAnswerOption = question.answerOptions.find((ans) => ans.isCorrect);
      setCorrectOption(correctAnswerOption);
  }

  const handleClick = (option) => {
    setSelectedAnswer(option);
    setAnswerClassname("selectedOption active");
    setIsPause(true);

    delay(3000, () => {
      setAnswerClassname(
        option.isCorrect ? "selectedOption correct" : "selectedOption wrong"
      );
    });

    delay(4000, () => {
      if (option.isCorrect) {
        correctAnswer();
        delay(4000, goToNextQuestion);
      } else {
        wrongAnswer();
        highLightAnswer();
        delay(4000, stopGame);
      }
    });
  };


  useEffect(() => {
    if (questionNumber - 1 === Questions.length) {
      setTimeOver(true);
    } else {
      setQuestion(Questions[questionNumber - 1]);
    }
  }, [Questions, setTimeOver, questionNumber]);

  return (
    <div className="quiz">
      <div className="question">{question?.question}</div>
      <ul className="options">
        {question?.answerOptions?.map((option, index) => {
          return (
            <li
              key={index}
              className={
                selectedAnswer === option ? answerClassname : correctOption && option.text === correctOption.text ? "selectedOption right" : "selectedOption"
              }
              onClick={() => handleClick(option)}
            >
              <span>{option.text}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Quiz;
