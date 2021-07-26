// Reference
// 1. https://redux.js.org/tutorials/essentials/part-2-app-structure

import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';

// Create a store
export const store = configureStore({
  reducer: {
    // (1) We want to have a state.counter section of the Redux state object
    // (2) We want the counterReducer function to be in charge of deciding if and how to update the state.counter section whenever an action is dispached
    counter: counterReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
