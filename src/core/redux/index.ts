import MemeReducer from './MemeSlice';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

const reducer = {
  memes: MemeReducer,
};

const middleware = [...getDefaultMiddleware()];

const store = configureStore({
  reducer,
  middleware,
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
