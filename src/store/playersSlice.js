import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllPlayers = createAsyncThunk("getPlayers", async (_, { rejectWithValue }) => {
   try {
      const response = await axios.get("/api/users");
      return response.data;
   } catch (ex) {
      return rejectWithValue(ex.response.data);
   }
});

export const addPlayer = createAsyncThunk("addPlayer", async (player, { rejectWithValue }) => {
   try {
      const token = window.localStorage.getItem("token");
      const response = await axios.post("/api/players", player, {
         headers: {
            authorization: token
         }
      });
      return response.data;
   } catch (ex) {
      return rejectWithValue(ex.response.data);
   }
});

export const updatePlayer = createAsyncThunk("updatePlayer", async (formData, { rejectWithValue }) => {
   const { id } = formData;
   try {
      const response = await axios.put(`/api/players/${id}`, formData);
      return response.data;
   } catch (ex) {
      return rejectWithValue(ex.response.data);
   }
});

export const deletePlayer = createAsyncThunk("deletePlayer", async (playerId, { rejectWithValue }) => {
   try {
      await axios.delete(`/api/players/${playerId}`);
   } catch (ex) {
      return rejectWithValue(ex.response.data);
   }
});

const playersSlice = createSlice({
   name: "players",
   initialState: {
      playerList: [],
      loading: false,
      error: null
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(fetchAllPlayers.pending, (state) => {
            state.loading = true;
         })
         .addCase(fetchAllPlayers.fulfilled, (state, action) => {
            state.loading = false;
            state.playerList.push(action.payload);
         })
         .addCase(fetchAllPlayers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
         })
         .addCase(addPlayer.pending, (state, action) => {
            state.loading = true;
         })
         .addCase(addPlayer.fulfilled, (state, action) => {
            state.loading = false;
            state.playerList.push(action.payload);
         })
         .addCase(addPlayer.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
         })
         .addCase(updatePlayer.pending, (state, action) => {
            state.loading = true;
         })
         .addCase(updatePlayer.fulfilled, (state, action) => {
            state.loading = false;
            state.playerList = state.playerList.map((player) =>
               player.id !== action.payload.id ? player : action.payload
            );
         })
         .addCase(updatePlayer.rejected, (state, action) => {
            state.error = action.error.message;
         });
   }
});

export default playersSlice.reducer;
