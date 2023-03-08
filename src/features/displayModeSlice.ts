import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { PaletteMode } from '@mui/material';

type DisplayMode = {
  type: PaletteMode;
};

const initialState: DisplayMode = { type: 'light' };
const slice = createSlice({
  name: 'display',
  initialState,
  reducers: {
    toDarkMode: (state) => {
      state.type = 'dark';
    },
    toLightMode: (state) => {
      state.type = 'light';
    },
  },
});

export const { toLightMode, toDarkMode } = slice.actions;
export const selectDisplayMode = (state: RootState) => state.displayMode;
export const displayModeReducer = slice.reducer;
