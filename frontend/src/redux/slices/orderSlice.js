import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/api";

export const fetchStoreOrders = createAsyncThunk(
  "orders/fetchStoreOrders",
  async (storeId, { rejectWithValue }) => {
    try {
      const res = await API.get("/vendor-orders", { params: { storeId } });
      return res.data.orders;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load orders",
      );
    }
  },
);

export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async ({ orderId, storeId, status }, { rejectWithValue }) => {
    try {
      const res = await API.put("/vendor-orders/status", {
        orderId,
        storeId,
        status,
      });
      return res.data.order;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update order",
      );
    }
  },
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStoreOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStoreOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchStoreOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const idx = state.orders.findIndex((o) => o._id === action.payload._id);
        if (idx !== -1) state.orders[idx] = action.payload;
      });
  },
});

export default orderSlice.reducer;
