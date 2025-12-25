import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoggedIn: !!localStorage.getItem("token"),
  user: {},
  loading: true,
  error: null,
};

export const getUserProfile = createAsyncThunk(
  "auth/getUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        "http://localhost:5001/api/users/profile",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(`token`)}`,
          },
        }
      );
      return data.user;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },

    logout: (state) => {
      state.isLoggedIn = false;
      localStorage.removeItem("token");
      state.user = {};
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });

    builder.addCase(getUserProfile.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getUserProfile.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
