import React, { useReducer, useCallback } from 'react';

const SET_STEP = 'SET_STEP';
const SET_LIMIT_CONTROL = 'SET_LIMIT_CONTROL';
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

const counterReducer = (state, { type, payload }) => {
  switch (type) {
    case SET_STEP:
      return {
        ...state,
        step: payload
      }
    case SET_LIMIT_CONTROL:
      return {
        ...state,
        preventNegativeCounter: payload
      }
    case INCREMENT: 
      return {
        ...state,
        counter: state.counter + state.step
      }
    case DECREMENT: 
      const { counter, step, preventNegativeCounter } = state;
      const newCounter = counter - step;
      const updateCounter = !preventNegativeCounter || (preventNegativeCounter && newCounter >= 0);
      return {
        ...state,
        counter: updateCounter ? newCounter : counter,
      }
    default:
      return state;
  }
}

const initialState = () => ({
  step: 1,
  counter: 0,
  preventNegativeCounter: false
})

function ReducerPage() {
  const [{ step, counter, preventNegativeCounter }, dispatch] = useReducer(counterReducer, initialState());

  const handleStepChange = useCallback(
    ({ target: { value }}) => dispatch({ type: SET_STEP, payload: parseInt(value)})
  , []);
  const handlePreventNegativeChange = useCallback(
    ({ target: { checked }}) => dispatch({ type: SET_LIMIT_CONTROL, payload: checked})
  , []);
  const handleIncrement = useCallback(() => dispatch({ type: INCREMENT }), []);
  const handleDecrement = useCallback(() => dispatch({ type: DECREMENT }), []);

  return <>
    <h2>Reducer Page</h2>
    <fieldset>
      <legend>Setup Counter</legend>
      <label>Counter step</label><br />
      <input type="number" value={step} onChange={handleStepChange} /><br />
      <input type="checkbox" checked={preventNegativeCounter}  onChange={handlePreventNegativeChange} /><label>Prevent negative counter</label><br />
    </fieldset>

    <h3>{counter}</h3>
    <button onClick={handleIncrement}>Increment</button>
    <button onClick={handleDecrement}>Decrement</button>
  </>;
}

export default ReducerPage;