import { combineReducers } from 'redux';
import { memeReducer } from './memeReducer';

const rootReducer = combineReducers({
  memes: memeReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
