import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllLeagues = createAsyncThunk("fetchAllLeagues", async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/leagues');
      return response.data;
    } catch(err){
        return rejectWithValue
    }
    }
);

export const addLeague = createAsyncThunk('addLeague', async(league, { rejectWithValue}) => {
    try {
        console.log('adding league')
        const token = window.localStorage.getItem('token');
        const response = await axios.post('/api/leagues', league, {
            headers: {
                authorization: token
            }
        })
        return response.data;
    } catch(err){
        return rejectWithValue;
    }
})


export const updateLeague = createAsyncThunk("updateLeague", async (formData, { rejectWithValue }) => {
    const { id } = formData;
    try {
      const token = window.localStorage.getItem('token');
      const response = await axios.put(`/api/leagues/${id}`, formData, {
        headers: {
            authorization: token
        }
    });
      return response.data;
    } catch(err){
        return rejectWithValue
    }
    }
);

export const deleteLeague = createAsyncThunk('deleteLeague', async(leagueId, {rejectWithValue}) => {
    try{
        await axios.delete(`/api/leagues/${leagueId}`, {
            headers: {
                authorization: token
            }
        });
    }catch(err){
        return rejectWithValue;
    }
})


const leagueSlice = createSlice({
    name: "leagues",
    initialState: {
        leaguesList: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchAllLeagues.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchAllLeagues.fulfilled, (state, action) => {
            
            state.loading = false;
            state.leaguesList.push(...action.payload);
        })
        .addCase(fetchAllLeagues.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(addLeague.pending, (state) => {
            state.loading = true
        })
        .addCase(addLeague.fulfilled, (state, action) => {
            state.loading = false;
            state.leaguesList.push(action.payload);
        })
        .addCase(addLeague.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(updateLeague.pending, (state) => {
            state.loading = true;
        })
        .addCase(updateLeague.fulfilled, (state, action) => {
            state.loading = false;
            state.leaguesList.map(league => league.id !== action.payload.id ? league : action.payload);
        })
        .addCase(updateLeague.rejected, (state, action) => {
            state.error = action.error.message;
        })
    }
})

export default leagueSlice.reducer;