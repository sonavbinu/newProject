import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stores: [],
  selectedStore: null,
};

const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    addStore: (state, action) => {
      state.stores.push(action.payload);
    },
    selectStore: (state, action) => {
      state.selectedStore = action.payload;
    },
  },
});

export const { addStore, selectStore } = storeSlice.actions;
export default storeSlice.reducer;
