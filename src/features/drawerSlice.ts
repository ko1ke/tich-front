import { createSlice } from '@reduxjs/toolkit';

type Drawer = {
  open: boolean;
};

const initialState: Drawer = { open: true };

const slice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    openDrawer: (state) => {
      state.open = true;
    },
    closeDrawer: (state) => {
      state.open = false;
    },
  },
});

export const { openDrawer, closeDrawer } = slice.actions;

export const drawerReducer = slice.reducer;
