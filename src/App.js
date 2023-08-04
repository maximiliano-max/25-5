import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSessionLength, setBreakLength, startTimer, pauseTimer, resetTimer, switchTimer } from "./actions";
import Countdown from "react-countdown";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  const sessionLength = useSelector((state) => state.sessionLength);
  const breakLength = useSelector((state) => state.breakLength);
  const timer = useSelector((state) => state.timer);
  const isRunning = useSelector((state) => state.isRunning);
  const currentPhase = useSelector((state) => state.currentPhase);
  const rounds = useSelector((state) => state.rounds);

  const handleSessionChange = (change) => {
    dispatch(setSessionLength(Math.min(60, Math.max(1, sessionLength + change))));
  };

  const handleBreakChange = (change) => {
    dispatch(setBreakLength(Math.min(60, Math.max(1, breakLength + change))));
  };

  const handleStartPause = () => {
    dispatch(isRunning ? pauseTimer() : startTimer());
  };

  const handleReset = () => {
    dispatch(resetTimer());
  };

  const handleComplete = () => {
    dispatch(switchTimer());
  };

  useEffect(() => {
    if (isRunning) {
      const timerInterval = setInterval(() => {
        dispatch(switchTimer());
      }, timer);
      return () => clearInterval(timerInterval);
    }
  }, [dispatch, isRunning, timer]);

  return (
    <div className="container">
      <h1 id="title" className="text-center mt-5">25 / 5</h1>
      <div className="row text-center mt-4">
        <div className="col">
          <div id="session-label">Session Length</div>
          <div className="btn-group" role="group" aria-label="Session Length">
            <button className="btn btn-secondary" onClick={() => handleSessionChange(-1)}>
              -
            </button>
            <div id="session-length" className="btn btn-light">
              {sessionLength}
            </div>
            <button className="btn btn-secondary" onClick={() => handleSessionChange(1)}>
              +
            </button>
          </div>
        </div>
        <div className="col">
          <div id="break-label">Break Length</div>
          <div className="btn-group" role="group" aria-label="Break Length">
            <button className="btn btn-secondary" onClick={() => handleBreakChange(-1)}>
              -
            </button>
            <div id="break-length" className="btn btn-light">
              {breakLength}
            </div>
            <button className="btn btn-secondary" onClick={() => handleBreakChange(1)}>
              +
            </button>
          </div>
        </div>
      </div>
      <div className="row justify-content-center mt-4">
        <div className="col text-center">
          <div id="timer-label">{currentPhase}</div>
          <div id="time-left" className="display-1">
            <Countdown
              date={Date.now() + timer}
              onComplete={handleComplete}
              renderer={({ minutes, seconds }) => `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}
            />
          </div>
          <div className="btn-group mt-4" role="group" aria-label="Timer Controls">
            <button className="btn btn-success" onClick={handleStartPause}>
              {isRunning ? "Pause" : "Start"}
            </button>
            <button className="btn btn-danger" onClick={handleReset}>
              Reset
            </button>
          </div>
          <div id="rounds" className="mt-4">
            Rounds: {rounds}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
