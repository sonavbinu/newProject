import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/api";

const categoryDefs = [
  { id: 1, name: "fruitsVegetables" },
  { id: 2, name: "dairyBreadEggs" },
  { id: 3, name: "snacksBiscuits" },
  { id: 4, name: "attaDalRice" },
  { id: 5, name: "dryFruitsMasala" },
  { id: 6, name: "teaCoffee" },
  { id: 7, name: "chocolatesDesserts" },
];

const initialState = {
  categories: categoryDefs.map((c) => ({ ...c, products: [] })),
  loading: false,
  error: null,
};

// Fetch all products for the current store, grouped by category
export const fetchMyProducts = createAsyncThunk(
  "products/fetchMyProducts",
  async (storeId, { rejectWithValue }) => {
    try {
      const res = await API.get("/products/my-products", {
        params: { storeId },
      });
      return res.data.categories;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load products",
      );
    }
  },
);

// Add a product (expects FormData if it includes an image file)
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async ({ storeId, categoryId, product }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("storeId", storeId);
      formData.append("categoryId", categoryId);
      Object.entries(product).forEach(([key, value]) => {
        if (key === "image" && value) {
          formData.append("image", value);
        } else if (key === "deliveryTypes") {
          formData.append("deliveryTypes", JSON.stringify(value));
        } else if (value !== null && value !== undefined) {
          formData.append(key, value);
        }
      });

      const res = await API.post("/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return { categoryId: Number(categoryId), product: res.data.product };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to add product",
      );
    }
  },
);

export const editPrice = createAsyncThunk(
  "products/editPrice",
  async ({ categoryId, productId, storeId, newPrice }, { rejectWithValue }) => {
    try {
      const res = await API.put("/products/price", {
        storeId,
        productId,
        newPrice,
      });
      return { categoryId, product: res.data.product };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update price",
      );
    }
  },
);

export const addStock = createAsyncThunk(
  "products/addStock",
  async ({ categoryId, productId, storeId, quantity }, { rejectWithValue }) => {
    try {
      const res = await API.put("/products/add-stock", {
        storeId,
        productId,
        quantity,
      });
      return { categoryId, product: res.data.product };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to add stock",
      );
    }
  },
);

export const minusStock = createAsyncThunk(
  "products/minusStock",
  async ({ categoryId, productId, storeId, quantity }, { rejectWithValue }) => {
    try {
      const res = await API.put("/products/minus-stock", {
        storeId,
        productId,
        quantity,
      });
      return { categoryId, product: res.data.product };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to reduce stock",
      );
    }
  },
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async ({ categoryId, productId, storeId }, { rejectWithValue }) => {
    try {
      await API.delete(`/products/${productId}`, { data: { storeId } });
      return { categoryId, productId };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete product",
      );
    }
  },
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchMyProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchMyProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add
      .addCase(addProduct.fulfilled, (state, action) => {
        const { categoryId, product } = action.payload;
        const category = state.categories.find((c) => c.id === categoryId);
        if (category) category.products.push(product);
      })

      // Edit price
      .addCase(editPrice.fulfilled, (state, action) => {
        const { categoryId, product } = action.payload;
        const category = state.categories.find((c) => c.id === categoryId);
        if (!category) return;
        const idx = category.products.findIndex((p) => p._id === product._id);
        if (idx !== -1) category.products[idx] = product;
      })

      // Add stock
      .addCase(addStock.fulfilled, (state, action) => {
        const { categoryId, product } = action.payload;
        const category = state.categories.find((c) => c.id === categoryId);
        if (!category) return;
        const idx = category.products.findIndex((p) => p._id === product._id);
        if (idx !== -1) category.products[idx] = product;
      })

      // Minus stock
      .addCase(minusStock.fulfilled, (state, action) => {
        const { categoryId, product } = action.payload;
        const category = state.categories.find((c) => c.id === categoryId);
        if (!category) return;
        const idx = category.products.findIndex((p) => p._id === product._id);
        if (idx !== -1) category.products[idx] = product;
      })

      // Delete
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const { categoryId, productId } = action.payload;
        const category = state.categories.find((c) => c.id === categoryId);
        if (category) {
          category.products = category.products.filter(
            (p) => p._id !== productId,
          );
        }
      });
  },
});

export default productSlice.reducer;
