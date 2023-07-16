import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createAction = createAsyncThunk(
  "createAction",
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
      return rejectWithValue("Not authorized to create Action.");
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
      return rejectWithValue("Not authorized to update Action.");
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
      return rejectWithValue("Not authorized to delete Action.");
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
      .addCase(createAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createAction.fulfilled, (state, action) => {
        state.loading = false;
        state.actionsList.push(action.payload);
      })
      .addCase(createAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAction.fulfilled, (state, action) => {
        state.loading = false;
        state.actionsList = state.actionsList.map((Action) =>
          Action.id !== action.payload.id ? action : action.payload
        );
      })
      .addCase(updateAction.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAction.fulfilled, (state, action) => {
        state.loading = false;
        state.actionsList = state.actionsList.filter(
          (action) => action.id !== action.payload.id
        );
      })
      .addCase(deleteAction.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default actionSlice.reducer;
