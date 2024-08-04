import { useEffect, useState } from "react";
import "./App.css";
import Quiz from "./components/Quiz";
import Timer from "./components/Timer";
import moneyTree from "./data/MoneyList";
import Questions from "./data/Questions";
import Start from "./components/Start";

const App = () => {
  const [username, setUsername] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [timeOver, setTimeOver] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const [earned, setEarned] = useState("0");

  useEffect(() => {
    if (questionNumber > 1) {
      setEarned(
        moneyTree.find((value) => value.id === questionNumber - 1).amount
      );
    }
  }, [questionNumber]);

  const handlePlayAgain = () => {
    setQuestionNumber(1);
    setTimeOver(false);
    setIsPause(false);
    setEarned("0");
  };

  const handleChangePlayer = () => {
    setUsername(null);
    setQuestionNumber(1);
    setTimeOver(false);
    setIsPause(false);
    setEarned("0");
  };

  return (
    <div className="container">
      {username ? (
        <>
          <div className="play">
            {timeOver ? (
              questionNumber - 1 === Questions.length ? (
                <div className="win">
                  <p>{username}</p>
                  <p>
                    Congratulations
                    <i className="fa-solid fa-hands-clapping"></i>
                    <i className="fa-solid fa-hands-clapping"></i>
                    <i className="fa-solid fa-hands-clapping"></i>
                  </p>
                  <p>
                    You Won The Game
                    <i className="fa-solid fa-trophy"></i>
                    <i className="fa-solid fa-trophy"></i>
                    <i className="fa-solid fa-trophy"></i>
                  </p>
                  <p>
                    You earned
                    <i className="fa-solid fa-indian-rupee-sign">
                      <span>{earned}</span>
                    </i>
                  </p>
                  <div className="newGameBtns">
                    <button className="playAgain" onClick={handlePlayAgain}>
                      Play Again
                    </button>
                    <button className="changePlayer" onClick={handleChangePlayer}>
                      Change Player
                    </button>
                  </div>
                </div>
              ) : (
                <div className="out">
                  {earned === "0" ? (
                    <div>
                      <p>{username}</p>
                      <p>Game Over</p>
                      <p>
                        You earned
                        <i className="fa-solid fa-indian-rupee-sign">
                          <span>{earned}</span>
                        </i>
                      </p>
                      <p>Better Luck Next Time</p>
                      <div className="newGameBtns">
                        <button className="playAgain" onClick={handlePlayAgain}>
                          Play Again
                        </button>
                        <button className="changePlayer" onClick={handleChangePlayer}>
                          Change Player
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p>{username}</p>
                      <p>
                        Congratulations
                        <i className="fa-solid fa-hands-clapping"></i>
                        <i className="fa-solid fa-hands-clapping"></i>
                        <i className="fa-solid fa-hands-clapping"></i>
                      </p>
                      <p>
                        You earned
                        <i className="fa-solid fa-indian-rupee-sign">
                          <span>{earned}</span>
                        </i>
                      </p>
                      <div className="newGameBtns">
                        <button className="playAgain" onClick={handlePlayAgain}>
                          Play Again
                        </button>
                        <button className="changePlayer" onClick={handleChangePlayer}>
                          Change Player
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )
            ) : (
              <>
                <div className="countdown">
                  <Timer
                    setTimeOver={setTimeOver}
                    isPause={isPause}
                    setIsPause={setIsPause}
                    questionNumber={questionNumber}
                  />
                </div>
                <div className="question-options">
                  <Quiz
                    Questions={Questions}
                    setIsPause={setIsPause}
                    earned={earned}
                    setTimeOver={setTimeOver}
                    questionNumber={questionNumber}
                    setQuestionNumber={setQuestionNumber}
                  />
                </div>
              </>
            )}
          </div>
          <div className="moneyTree">
            <ul className="moneyList">
              {moneyTree.map((value) => {
                return (
                  <li
                    key={value.id}
                    className={questionNumber === value.id ? "moneyListItem active" : "moneyListItem"}
                  >
                    <span className="moneyListItemId">{value.id}</span>
                    <span className="moneyListItemAmount">{value.amount}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      ) : (
        <Start setUsername={setUsername} />
      )}
    </div>
  );
};

export default App;
