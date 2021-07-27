import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice'; 

// (1) Create the store for app states and the reducers that handle the update logic
export const store = configureStore({
  // (2) The root reducer
  reducer: {
    counter: counterReducer,
    // (key) counter: we want to have a "state.counter" section of the Redux state object
    // (reducer) counterReducer: we want the counterReducer function to be in charge of deciding if and how to update the state.counter section whenever an action is dispached

    // (3) Other features
    // xxx: xxxReducer,
  },
});

// (4) Define the AppDispatch for action routing and trigger the component state update
export type AppDispatch = typeof store.dispatch;

// (5) Define the RootState that unified state of components
//     Depends
//     Code: the state selector in components
//     File: Component slice source(xxxSlice.ts)
export type RootState = ReturnType<typeof store.getState>; 

// (6) Define a helper AppThunk for creating thunk object to handle the
//     "async" activity logic and the dispatch
//     Depends
//     Code: the thunk object that Async update state logic (version: manual) 
//     File: Component slice source(xxxSlice.ts)
// Ref
//     1. https://bloggie.io/@_ChristineOo/understanding-typings-of-redux-thunk-action
//     2. https://github.com/reduxjs/redux-thunk#why-do-i-need-this
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
