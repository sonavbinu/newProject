import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/api";

export const registerCustomer = createAsyncThunk(
  "customerAuth/register",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const res = await API.post("/customer-auth/register", {
        name,
        email,
        password,
      });
      localStorage.setItem("customerToken", res.data.token);
      return res.data.customer;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Registration failed",
      );
    }
  },
);

export const loginCustomer = createAsyncThunk(
  "customerAuth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await API.post("/customer-auth/login", { email, password });
      localStorage.setItem("customerToken", res.data.token);
      return res.data.customer;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  },
);

const customerAuthSlice = createSlice({
  name: "customerAuth",
  initialState: {
    customer: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.customer = null;
      localStorage.removeItem("customerToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.customer = action.payload;
      })
      .addCase(registerCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.customer = action.payload;
      })
      .addCase(loginCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = customerAuthSlice.actions;
export default customerAuthSlice.reducer;
