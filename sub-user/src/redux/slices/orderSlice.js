import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/api";

export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async ({ storeId, items, phone, address }, { rejectWithValue }) => {
    try {
      const res = await API.post("/orders", {
        storeId,
        items: items.map((i) => ({
          productId: i.productId,
          quantity: i.quantity,
        })),
        phone,
        address,
      });
      return res.data.order;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to place order",
      );
    }
  },
);

export const fetchMyOrders = createAsyncThunk(
  "order/fetchMyOrders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/orders/my-orders");
      return res.data.orders;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load orders",
      );
    }
  },
);
export const deleteOrder = createAsyncThunk(
  "order/deleteOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      await API.delete(`/orders/${orderId}`);
      return orderId;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete order",
      );
    }
  },
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.unshift(action.payload);
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMyOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter((o) => o._id !== action.payload);
      });
  },
});

export default orderSlice.reducer;
