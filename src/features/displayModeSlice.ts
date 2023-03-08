import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { PaletteMode } from '@mui/material';

type DisplayMode = {
  type: PaletteMode;
};

const initialState: DisplayMode = {
  type: (localStorage.getItem('dark-mode-type') as PaletteMode) || 'light',
};
const slice = createSlice({
  name: 'display',
  initialState,
  reducers: {
    toDarkMode: (state) => {
      localStorage.setItem('dark-mode-type', 'dark');
      state.type = 'dark';
    },
    toLightMode: (state) => {
      localStorage.setItem('dark-mode-type', 'light');
      state.type = 'light';
    },
  },
});

export const { toLightMode, toDarkMode } = slice.actions;
export const selectDisplayMode = (state: RootState) => state.displayMode;
export const displayModeReducer = slice.reducer;
