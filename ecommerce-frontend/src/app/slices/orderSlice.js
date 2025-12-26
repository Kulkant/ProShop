import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (order, { getState, rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      if (!token) {
        return rejectWithValue(`No token found , please login!`);
      }

      if (!token) {
        return rejectWithValue(
          "User is not authenticated. Please login again."
        );
      }

      const { data } = await axios.post(
        "http://localhost:5001/api/order",
        order,
        config
      );
      return data;
    } catch (error) {
      console.error(error.message);
    }
  }
);

export const getOrderDetails = createAsyncThunk(
  "/order/getOrderDetails",
  async (id, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    if (!token) {
      return rejectWithValue(`No token found , please login!`);
    }

    try {
      const response = await axios.get(
        `http://localhost:5001/api/order/${id}`,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const payOrder = createAsyncThunk(
  "/order/payOrder",
  async ({ orderId, paymentResult }, { getState, rejectWithValue }) => {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      console.log("Sending Pay Request for ID:", orderId);

      const { data } = axios.put(
        `http://localhost:5001/api/order/${orderId}/pay`,
        paymentResult,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const listMyOrders = createAsyncThunk(
  "order/listMyOrders",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        `http://localhost:5001/api/order/myorders`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: {},
    success: false,
    loading: false,
    error: null,
    successPay: false,
    loadingPay: false,
    orders: [],
    isOrdersLoading: false,
  },
  reducers: {
    resetOrder: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createOrder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createOrder.fulfilled, (state, action) => {
      (state.loading = false),
        (state.success = true),
        (state.order = action.payload);
    });
    builder.addCase(createOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(getOrderDetails.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(getOrderDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.order = action.payload;
      console.log(`acton paylod : ${action.payload}`);
    });

    builder.addCase(getOrderDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      console.log(`acton paylod : ${action.payload}`);
    });

    builder.addCase(payOrder.pending, (state) => {
      state.loadingPay = true;
    });

    builder.addCase(payOrder.fulfilled, (state, action) => {
      (state.loadingPay = false), (state.successPay = action.payload);
    });

    builder.addCase(payOrder.rejected, (state, action) => {
      (state.loadingPay = false), (state.error = action.payload);
    });

    builder.addCase(listMyOrders.pending, (state, action) => {
      state.isOrdersLoading = true;
    });

    builder.addCase(listMyOrders.fulfilled, (state, action) => {
      state.isOrdersLoading = false;
      state.orders = action.payload;
    });

    builder.addCase(listMyOrders.rejected, (state, action) => {
      state.isOrdersLoading = false;
      state.error = action.payload;
    });
  },
});

export const { resetOrder } = orderSlice.actions;
export default orderSlice.reducer;
