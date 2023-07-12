import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addAction = createAsyncThunk(
  "addAction",
  async (action, { rejectWithValue }) => {
    try {
      const token = window.localStorage.getItem("token");
      const response = await axios.post("/api/actions", action, {
        headers: {
          authorization: token,
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue("Not authorized to create category.");
    }
  }
);

export const updateAction = createAsyncThunk(
  "updateAction",
  async (action, { rejectWithValue }) => {
    const { id } = action;
    try {
      const response = await axios.put(`/api/actions/${id}`, action);
      return response.data;
    } catch (err) {
      return rejectWithValue("Not authorized to update category.");
    }
  }
);

export const deleteAction = createAsyncThunk(
  "deleteAction",
  async (actionId, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/actions/${actionId}`);
      return actionId;
    } catch (err) {
      return rejectWithValue("Not authorized to delete category.");
    }
  }
);

const actionSlice = createSlice({
  name: "actions",
  initialState: {
    actionsList: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCategory.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categoriesList.push(action.payload);
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categoriesList = state.categoriesList.map((category) =>
          category.id !== action.payload.id ? category : action.payload
        );
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categoriesList = state.categoriesList.filter(
          (category) => category.id !== action.payload.id
        );
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

