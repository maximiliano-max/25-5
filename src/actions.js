export const SET_SESSION_LENGTH = "SET_SESSION_LENGTH";
export const SET_BREAK_LENGTH = "SET_BREAK_LENGTH";
export const START_TIMER = "START_TIMER";
export const PAUSE_TIMER = "PAUSE_TIMER";
export const RESET_TIMER = "RESET_TIMER";
export const SWITCH_TIMER = "SWITCH_TIMER";

export const setSessionLength = (minutes) => ({
  type: SET_SESSION_LENGTH,
  payload: minutes,
});

export const setBreakLength = (minutes) => ({
  type: SET_BREAK_LENGTH,
  payload: minutes,
});

export const startTimer = () => ({ type: START_TIMER });
export const pauseTimer = () => ({ type: PAUSE_TIMER });
export const resetTimer = () => ({ type: RESET_TIMER });
export const switchTimer = () => ({ type: SWITCH_TIMER });