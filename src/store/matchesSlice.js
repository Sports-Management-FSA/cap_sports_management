import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllMatches = createAsyncThunk("getMatches", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get('/api/matches');
        return response.data;
    } catch (err) {
        return rejectWithValue;
    }
});

export const fetchMatchById = createAsyncThunk("getMatchById", async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(`/api/matches/${id}`);
        return response.data;
    } catch (err) {
        return rejectWithValue;
    }
});

export const addMatch = createAsyncThunk('addMatch', async ({match, team1, team2}, { rejectWithValue }) => {
    try {
        console.log('adding team')
        const token = window.localStorage.getItem('token');
        const response = await axios.post('/api/matches', {match, team1, team2}, {
            headers: {
                authorization: token
            }
        })
        return response.data;
    } catch (err) {
        return rejectWithValue;
    }
});

export const updateMatch = createAsyncThunk("updateMatch", async (match, { rejectWithValue }) => {
    const { id } = match;
    try {
        const token = window.localStorage.getItem('token');
        const response = await axios.put(`/api/matches/${id}`, match, {
            headers: {
                authorization: token
            }
        });
        return response.data;
    } catch (err) {
        return rejectWithValue;
    }
});

export const deleteMatch = createAsyncThunk("deleteMatch", async (matchId, { rejectWithValue }) => {
    try {
       await axios.delete(`/api/matches/${matchId}`, {
          headers: {
             authorization: token
          }
       });
    } catch (err) {
       return rejectWithValue("Not authorized to delete Match.");
    }
 });
 

const matchesSlice = createSlice({
    name: 'matches',
    initialState: {
        matchesList: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllMatches.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllMatches.fulfilled, (state, action) => {
                state.loading = false;
                state.matchesList.push(...action.payload);
            })
            .addCase(fetchAllMatches.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchMatchById.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchMatchById.fulfilled, (state, action) => {
                state.loading = false;
                return action.payload;
            })
            .addCase(fetchMatchById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addMatch.pending, (state) => {
                state.loading = true;
            })
            .addCase(addMatch.fulfilled, (state, action) => {
                state.loading = false;
                state.matchesList.push(action.payload);
            })
            .addCase(addMatch.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateMatch.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateMatch.fulfilled, (state, action) => {
                state.loading = false;
                state.matchesList.map(match => match.id !== action.payload.id ? match : action.payload);
            })
            .addCase(updateMatch.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteMatch.pending, (state) => {
                state.loading = true;
             })
             .addCase(deleteMatch.fulfilled, (state, action) => {
                state.loading = false;
                state.matchesList = state.matchesList.filter((match) => (match.id !== action.payload.id));
             })
             .addCase(deleteMatch.rejected, (state, action) => {
                state.error = action.error.message;
             });
    }
})

export default matchesSlice.reducer;