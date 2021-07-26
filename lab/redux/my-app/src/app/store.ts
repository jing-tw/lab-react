// The current Redux application state
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice'; // import the counter logic for "state.counter"

// Create the store for whole app
export const store = configureStore({
  // Define the root reducer for the application store
  reducer: {
    // (1) We want to have a "state.counter" section of the Redux state object
    // (2) We want the counterReducer function to be in charge of deciding if and how to update the state.counter section whenever an action is dispached
    counter: counterReducer,
    // (3) If there is another "state.xxx" section would like to add to the state object
    // xxx: xxxReducer,
  },
});

// (4) The store.dispath function is the noly way to update the state, here, the inferred the dispatch type as {counter: CounterState, xxx:XxxState} 
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>; // (5) export the RootState type
export type AppThunk<ReturnType = void> = ThunkAction<     // (6) https://bloggie.io/@_ChristineOo/understanding-typings-of-redux-thunk-action
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
