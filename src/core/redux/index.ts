import MemeReducer from './MemeSlice';
import ToastReducer from './ToastSlice';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import undoable from './undoableReducer';

const reducer = {
  memes: undoable(MemeReducer),
  toast: ToastReducer,
};

const middleware = [...getDefaultMiddleware()];

const store = configureStore({
  reducer,
  middleware,
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
