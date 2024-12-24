import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  coins: [],
  filtered: [],
  searchInput: "",
};
  
export const coinSlice = createSlice({
  name: 'coin',
  initialState,
  reducers: {
    setCoins: (state, action) => {
      state.coins = action.payload;
    },
    setFiltered: (state, action) => {
      state.filtered = action.payload;
    },
    setSearchInput: (state, action) => {
      state.searchInput = action.payload;
    }
  }
});
  
export const { 
  setCoins,
  setFiltered,
  setSearchInput
} = coinSlice.actions;

export default coinSlice.reducer;