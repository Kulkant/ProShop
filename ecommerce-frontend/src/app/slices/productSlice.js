import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`http://localhost:5001/api/products`);
      return data; //this data will go in fullilled extra reducer
    } catch (error) {
      //if api fail eturn error message
      return rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  products: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      (state.loading = true), (state.error = null);
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      //the data returned from async thunk is in action.payload
      state.products = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export const { clearError } = productSlice.actions;
export default productSlice.reducer;
