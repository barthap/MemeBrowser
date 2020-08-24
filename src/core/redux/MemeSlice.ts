import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMeme } from '../interafaces';

const memeSlice = createSlice({
  name: 'memes',
  initialState: [] as IMeme[],
  reducers: {
    addMemes(state, action: PayloadAction<IMeme[]>) {
      state.push(...action.payload);
    },
  },
});

export const { addMemes } = memeSlice.actions;
export default memeSlice.reducer;
