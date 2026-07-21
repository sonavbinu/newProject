import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/api";

export const fetchSelectedStore = createAsyncThunk(
  "store/fetchSelectedStore",
  async (storeId, { rejectWithValue }) => {
    try {
      const res = await API.get(`/stores/${storeId}`);
      return res.data.store;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load store",
      );
    }
  },
);

const storeSlice = createSlice({
  name: "store",
  initialState: {
    stores: [],
    selectedStore: null,
    loading: false,
    error: null,
  },
  reducers: {
    addStore: (state, action) => {
      state.stores.push(action.payload);
    },
    setStores: (state, action) => {
      state.stores = action.payload;
    },
    selectStore: (state, action) => {
      state.selectedStore = action.payload;
      if (action.payload?._id) {
        localStorage.setItem("selectedStoreId", action.payload._id);
      }
    },
    clearStore: (state) => {
      state.selectedStore = null;
      localStorage.removeItem("selectedStoreId");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSelectedStore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSelectedStore.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedStore = action.payload;
        if (action.payload?._id) {
          localStorage.setItem("selectedStoreId", action.payload._id);
        }
      })
      .addCase(fetchSelectedStore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addStore, setStores, selectStore, clearStore } =
  storeSlice.actions;
export default storeSlice.reducer;
