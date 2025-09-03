import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  isGlobalLoadingSearch: boolean;
}

const initialState: SearchState = {
  isGlobalLoadingSearch: false,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setIsGlobalLoadingSearch(state, action: PayloadAction<boolean>) {
      state.isGlobalLoadingSearch = action.payload;
    },
  },
});

export const { setIsGlobalLoadingSearch } = searchSlice.actions;

export default searchSlice.reducer;
