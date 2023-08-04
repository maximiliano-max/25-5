import {
    SET_SESSION_LENGTH,
    SET_BREAK_LENGTH,
    START_TIMER,
    PAUSE_TIMER,
    RESET_TIMER,
    SWITCH_TIMER,
  } from "./actions";
  
  const initialState = {
    sessionLength: 25,
    breakLength: 5,
    timer: 25 * 60 * 1000, 
    isRunning: false,
    rounds: 0,
    currentPhase: "Session", 
  };
  
  const calculateTimer = (sessionLength, breakLength, currentPhase) => {
    if (currentPhase === "Session") {
      return sessionLength * 60 * 1000;
    } else {
      return breakLength * 60 * 1000;
    }
  };
  
  const pomodoroReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_SESSION_LENGTH:
        return {
          ...state,
          sessionLength: action.payload,
          timer: calculateTimer(action.payload, state.breakLength, state.currentPhase),
        };
      case SET_BREAK_LENGTH:
        return {
          ...state,
          breakLength: action.payload,
          timer: calculateTimer(state.sessionLength, action.payload, state.currentPhase),
        };
      case START_TIMER:
        return { ...state, isRunning: true };
      case PAUSE_TIMER:
        return { ...state, isRunning: false };
      case RESET_TIMER:
        return {
          ...initialState,
          sessionLength: state.sessionLength,
          breakLength: state.breakLength,
        };
      case SWITCH_TIMER:
        const newPhase = state.currentPhase === "Session" ? "Break" : "Session";
        return {
          ...state,
          timer: calculateTimer(state.sessionLength, state.breakLength, newPhase),
          isRunning: true,
          currentPhase: newPhase,
          rounds: newPhase === "Session" ? state.rounds + 1 : state.rounds,
        };
      default:
        return state;
    }
  };
  
  export default pomodoroReducer;