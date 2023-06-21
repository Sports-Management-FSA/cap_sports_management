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

export const addMatch = createAsyncThunk('addMatch', async (match, { rejectWithValue }) => {
    try {
        console.log('adding team')
        const token = window.localStorage.getItem('token');
        const response = await axios.post('/api/matches', match, {
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
            .addCase(fetchAllMatches.fulfilled, (action, state) => {
                state.loading = false;
                state.matchesList.push(action.payload);
            })
            .addCase(fetchAllMatches.rejected, (action, state) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchMatchById.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchMatchById.fulfilled, (action, state) => {
                state.loading = false;
                return action.payload;
            })
            .addCase(fetchMatchById.rejected, (action, state) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addMatch.pending, (state) => {
                state.loading = true;
            })
            .addCase(addMatch.fulfilled, (action, state) => {
                state.loading = false;
                state.matchesList.push(action.payload);
            })
            .addCase(addMatch.rejected, (action, state) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateMatch.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateMatch.fulfilled, (action, state) => {
                state.loading = false;
                state.matchesList.map(match => match.id !== action.payload.id ? match : action.payload);
            })
            .addCase(updateMatch.rejected, (action, state) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
})

export default matchesSlice.reducer;