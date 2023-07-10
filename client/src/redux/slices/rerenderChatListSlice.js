import { createSlice } from '@reduxjs/toolkit';

const rerenderSlice = createSlice({
  name: 'rerender',
  initialState: false,
  reducers: {
    setRerender: (state, action) => {
      return action.payload;
    },
  },
});

export const { setRerender } = rerenderSlice.actions;

export default rerenderSlice.reducer;
export const rerenderReducer = (state)=>state.persistedReducer.rerenderReducer