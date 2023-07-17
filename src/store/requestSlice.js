import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllRequests = createAsyncThunk("getRequests", async (_, { rejectWithValue }) => {
   try {
      const response = await axios.get("/api/requests");
      return response.data;
   } catch (err) {
      return rejectWithValue;
   }
});

export const addRequest = createAsyncThunk("addRequest", async (request, { rejectWithValue }) => {
   try {
      const token = window.localStorage.getItem("token");
      const response = await axios.post("/api/requests", request, {
         headers: {
            authorization: token
         }
      });
      return response.data;
   } catch (err) {
      return rejectWithValue('Not authorized to create request.');
   }
});

export const updateRequest = createAsyncThunk("updateRequest", async (formData, { rejectWithValue }) => {
   const { id } = formData;
   try {
      const token = window.localStorage.getItem("token");
      const response = await axios.put(`/api/requests/${id}`, formData, {
         headers: {
            authorization: token
         }
      });
      return response.data;
   } catch (err) {
      return rejectWithValue('Not authorized to update request.');
   }
});

export const deleteRequest = createAsyncThunk('deleteRequest', async(requestId, {rejectWithValue}) => {
    try{
        await axios.delete(`/api/requests/${requestId}`);
        return(requestId);
    }catch(err){
        return rejectWithValue('Not authorized to delete request.');
    }
})


const requestsSlice = createSlice({
   name: "requests",
   initialState: {
      requestsList: [],
      loading: false,
      error: null
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(fetchAllRequests.pending, (state) => {
            state.loading = true;
         })
         .addCase(fetchAllRequests.fulfilled, (state, action) => {
            state.loading = false;
            state.requestsList.push(...action.payload);
         })
         .addCase(fetchAllRequests.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
         })
         .addCase(addRequest.pending, (state, action) => {
            state.loading = true;
         })
         .addCase(addRequest.fulfilled, (state, action) => {
            state.loading = false;
            state.requestsList.push(action.payload);
         })
         .addCase(addRequest.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
         })
         .addCase(updateRequest.pending, (state) => {
            state.loading = true;
         })
         .addCase(updateRequest.fulfilled, (state, action) => {
            state.loading = false;
            state.requestsList = state.requestsList.map((request) => (request.id !== action.payload.id ? request : action.payload));
         })
         .addCase(updateRequest.rejected, (state, action) => {
            state.error = action.error.message;
         })
         .addCase(deleteRequest.pending, (state) => {
            state.loading = true;
         })
         .addCase(deleteRequest.fulfilled, (state, action) => {
            state.loading = false;
            state.requestsList = state.requestsList.filter((request) => (request.id !== action.payload.id));
         })
         .addCase(deleteRequest.rejected, (state, action) => {
            state.error = action.error.message;
         });
   }
});

export default requestsSlice.reducer;