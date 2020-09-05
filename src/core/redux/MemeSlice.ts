import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MemeEntity } from '../interafaces';

const memeSlice = createSlice({
  name: 'memes',
  initialState: [] as MemeEntity[],
  reducers: {
    addMemes(state, action: PayloadAction<MemeEntity[]>) {
      state.push(...action.payload);
    },
    deleteMeme(state, action: PayloadAction<string>) {
      const idx = state.findIndex(it => it.id === action.payload);
      if (idx >= 0) state.splice(idx, 1);
    },
  },
});

export const { addMemes, deleteMeme } = memeSlice.actions;
export default memeSlice.reducer;
