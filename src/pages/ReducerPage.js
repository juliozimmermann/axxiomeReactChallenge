import React, { useState, useCallback, useReducer, useMemo } from 'react'

const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';
const PREVENT_NEGATIVE = 'PREVENT_NEGATIVE';

function counterReducer(state, { type, payload }) {
  switch (type) {
    case INCREASE:
      return {
        ...state,
        counter: state.counter + 1
      }
    case DECREASE: 
      let newCounter = 0;

      if (state.preventNegativeCounter && state.counter <= 0)
        newCounter = state.counter;
      else 
        newCounter = state.counter - 1;

      return {
        ...state,
        counter: newCounter
      }
    case PREVENT_NEGATIVE:
      return {
        ...state,
        preventNegativeCounter: !state.preventNegativeCounter
      }
    default:
      return state;
  }
}

const initialState = () => ({
  counter: 0,
  preventNegativeCounter: false
});

export default function CounterState() {
  const [{ counter, preventNegativeCounter }, dispatch] = useReducer(counterReducer, initialState());

  const handlePreventNegativeCounter = useCallback(() => dispatch({ type: PREVENT_NEGATIVE }), []);

  const handleIncreaseClick = useCallback(() => dispatch({ type: INCREASE }), []);
  const handleDecreaseClick = useCallback(() => dispatch({ type: DECREASE }), []);

  return <>
    <h1>Counter Reducer</h1>
    <input type="checkbox" selected={preventNegativeCounter} onChange={handlePreventNegativeCounter} />
    <label>Prevent negative counter</label>
    <br />
    {counter}
    <button type="button" onClick={handleIncreaseClick}>Increase</button>
    <button type="button" onClick={handleDecreaseClick}>Decrease</button>
  </>;
}