import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  coins: [],
  filtered: [],
  searchInput: "",
  searchResults: [],
  selectedCountry: "",
  selectedMetal: "",
  selectedQuality: "",
  priceRange: {from: "", to: ""},
  yearRange: {from: "", to: ""},
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
    },
    setSelectedCountry: (state, action) => {state.selectedCountry = action.payload},
    setSelectedMetal: (state, action) => {state.selectedMetal = action.payload},
    setSelectedQuality: (state, action) => {state.selectedQuality = action.payload},
    setPriceRange: (state, action) => {state.priceRange = action.payload},
    setYearRange: (state, action) => {state.yearRange = action.payload},
  },
  setSearchResults: (state, action) => {
    state.searchResults = action.payload;
  },
});
  
export const { 
  setCoins,
  setFiltered,
  setSearchInput,
  setSelectedCountry,
  setSelectedMetal,
  setSelectedQuality,
  setPriceRange,
  setYearRange,
  setSearchResults
} = coinSlice.actions;

export default coinSlice.reducer;