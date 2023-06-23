import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllTeams = createAsyncThunk("getTeams", async (_, { rejectWithValue }) => {
   try {
      const response = await axios.get("/api/teams");
      return response.data;
   } catch (err) {
      return rejectWithValue;
   }
});

export const fetchTeamsByLeague = createAsyncThunk("fetchTeamsByLeague", async (leagueId, { rejectWithValue }) => {
   try {

      const response = await axios.get(`/api/leagues/${leagueId}/teams`);
      return response.data;
   } catch (err) {
      return rejectWithValue;
   }
});

export const addTeam = createAsyncThunk("addTeam", async (team, { rejectWithValue }) => {
   console.log(team)
   try {
      console.log("adding team");
      const token = window.localStorage.getItem("token");
      const response = await axios.post("/api/teams", team, {
         headers: {
            authorization: token
         }
      });
      return response.data;
   } catch (err) {
      return rejectWithValue('Not authorized to create team.');
   }
});

export const updateTeam = createAsyncThunk("updateTeam", async (formData, { rejectWithValue }) => {
   const { id } = formData;
   try {
      const response = await axios.put(`/api/teams/${id}`, formData);
      return response.data;
   } catch (err) {
      return rejectWithValue('Not authorized to update league.');
   }
});

export const deleteTeam = createAsyncThunk('deleteTeam', async(teamId, {rejectWithValue}) => {
    try{
        await axios.delete(`/api/teams/${teamId}`);
        return(teamId);
    }catch(err){
        return rejectWithValue('Not authorized to delete league.');
    }
})


const teamsSlice = createSlice({
   name: "teams",
   initialState: {
      teamsList: [],
      loading: false,
      error: null
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(fetchAllTeams.pending, (state) => {
            state.loading = true;
         })
         .addCase(fetchAllTeams.fulfilled, (state, action) => {
            state.loading = false;
            console.log('teamslice result of fetch all')
            console.log(action.payload)
            state.teamsList.push(...action.payload);
         })
         .addCase(fetchAllTeams.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
         })
         .addCase(fetchTeamsByLeague.pending, (state) => {
            state.loading = true;
         })
         .addCase(fetchTeamsByLeague.fulfilled, (state, action) => {
            state.loading = false;
            state.teamsList.push(action.payload);
         })
         .addCase(fetchTeamsByLeague.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
         })
         .addCase(addTeam.pending, (state, action) => {
            state.loading = true;
         })
         .addCase(addTeam.fulfilled, (state, action) => {
            state.loading = false;
            state.teamsList.push(action.payload);
         })
         .addCase(addTeam.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
         })
         .addCase(updateTeam.pending, (state) => {
            state.loading = true;
         })
         .addCase(updateTeam.fulfilled, (state, action) => {
            state.loading = false;
            state.teamsList = state.teamsList.map((team) => (team.id !== action.payload.id ? team : action.payload));
         })
         .addCase(updateTeam.rejected, (state, action) => {
            state.error = action.error.message;
         })
         .addCase(deleteTeam.pending, (state) => {
            state.loading = true;
         })
         .addCase(deleteTeam.fulfilled, (state, action) => {
            state.loading = false;
            state.teamsList = state.teamsList.filter((team) => (team.id !== action.payload.id));
         })
         .addCase(deleteTeam.rejected, (state, action) => {
            state.error = action.error.message;
         });
   }
});

export default teamsSlice.reducer;
