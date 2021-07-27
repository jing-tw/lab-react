
import React, { useState } from 'react';

// (1) Import the AppSelector and AppDispatch hooks for access the store
import { useAppSelector, useAppDispatch } from '../../app/hooks';

// (2) Import the component actions and the state selector
//     [actions]:  for trigger component state updates and 
//     [selector]: for extacting the componet state from store
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
  selectCount,
  selectStatus
} from './counterSlice';

import styles from './Counter.module.css';

// (2) The Component
export function Counter() {
  // (3) [access store] Extract the count state
  //     Render
  //     Any time an action has been dispatched and the Redux store has been updated, 
  //     useSelector will re-run our selector function. If the selector returns a different value than last time, 
  //     useSelector will make sure our component re-renders with the new value.
  //
  //     Ref
  //     https://redux.js.org/tutorials/essentials/part-2-app-structure#reading-data-with-useselector
  const count:number = useAppSelector(selectCount);   

  // (4) [access store] Extract the status state
  const status:string = useAppSelector(selectStatus);

  // (5) [access store] Get the app dispatch function
  const dispatch = useAppDispatch();

  // (6) The React build-in hooks for component state
  const [incrementAmount, setIncrementAmount] = useState('2');
  const incrementValue = Number(incrementAmount) || 0;  

  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>

        <span className={styles.value}>{count}</span>
        <span className={styles.value}>{status}</span>

        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() => dispatch(incrementByAmount(incrementValue))}
        >
          Add Amount
        </button>
        <button
          className={styles.asyncButton}
          onClick={() => dispatch(incrementAsync(incrementValue))}
        >
          Add Async
        </button>
        <button
          className={styles.button}
          onClick={() => dispatch(incrementIfOdd(incrementValue))}
        >
          Add If Odd
        </button>
      </div>
    </div>
  );
}
