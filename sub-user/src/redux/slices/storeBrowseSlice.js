import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/api";

export const fetchApprovedStores = createAsyncThunk(
  "storeBrowse/fetchApprovedStores",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/public/stores");
      return res.data.stores;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load stores",
      );
    }
  },
);

export const fetchStoreProducts = createAsyncThunk(
  "storeBrowse/fetchStoreProducts",
  async (storeId, { rejectWithValue }) => {
    try {
      const res = await API.get(`/public/stores/${storeId}/products`);
      return res.data; // { store, products }
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load products",
      );
    }
  },
);

const storeBrowseSlice = createSlice({
  name: "storeBrowse",
  initialState: {
    stores: [],
    selectedStoreId: null,
    selectedStoreProducts: [],
    loading: false,
    error: null,
  },
  reducers: {
    selectStore: (state, action) => {
      state.selectedStoreId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApprovedStores.fulfilled, (state, action) => {
        state.stores = action.payload;
      })
      .addCase(fetchStoreProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStoreProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedStoreProducts = action.payload.products;
      })
      .addCase(fetchStoreProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { selectStore } = storeBrowseSlice.actions;
export default storeBrowseSlice.reducer;
