import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllScorekeepers = createAsyncThunk("fetchAllScorekeepers", async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/scorekeepers');
      return response.data;
    } catch(err){
        return rejectWithValue
    }
    }
);

export const addScorekeeper = createAsyncThunk('addScorekeeper', async(Scorekeeper, { rejectWithValue}) => {
    try {
        const token = window.localStorage.getItem('token');
        //scorekeeper object should include: matchId, userId, actionId, ScorekeeperId
        const response = await axios.post('/api/scorekeepers', Scorekeeper, {
            headers: {
                authorization: token
            }
        })
        return response.data;
    } catch(err){
        return rejectWithValue('Not authorized to create Scorekeeper.');
    }
})


export const updateScorekeeper = createAsyncThunk("updateScorekeeper", async (formData, { rejectWithValue }) => {
    const { id } = formData;
    try {
      const token = window.localStorage.getItem('token');
      const response = await axios.put(`/api/Scorekeepers/${id}`, formData, {
        headers: {
            authorization: token
        }
    });
      return response.data;
    } catch(err){
        return rejectWithValue('Not authorized to update Scorekeeper.');
    }
    }
);

export const deleteScorekeeper = createAsyncThunk('deleteScorekeeper', async(id, {rejectWithValue}) => {
    try{
        await axios.delete(`/api/Scorekeepers/${id}`, {
            headers: {
                authorization: token
            }
        });
    }catch(err){
        return rejectWithValue('Not authorized to delete Scorekeeper.');;
    }
})


const scorekeepersSlice = createSlice({
    name: "Scorekeepers",
    initialState: {
        scorekeepersList: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchAllScorekeepers.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchAllScorekeepers.fulfilled, (state, action) => {
            
            state.loading = false;
            state.scorekeepersList.push(...action.payload);
        })
        .addCase(fetchAllScorekeepers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(addScorekeeper.pending, (state) => {
            state.loading = true
        })
        .addCase(addScorekeeper.fulfilled, (state, action) => {
            state.loading = false;
            state.scorekeepersList.push(action.payload);
        })
        .addCase(addScorekeeper.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(updateScorekeeper.pending, (state) => {
            state.loading = true;
        })
        .addCase(updateScorekeeper.fulfilled, (state, action) => {
            state.loading = false;
            state.scorekeepersList.map(scorekeeper => scorekeeper.id !== action.payload.id ? scorekeeper : action.payload);
        })
        .addCase(updateScorekeeper.rejected, (state, action) => {
            state.error = action.error.message;
        })
        .addCase(deleteScorekeeper.pending, (state) => {
            state.loading = true;
         })
         .addCase(deleteScorekeeper.fulfilled, (state, action) => {
            state.loading = false;
            state.scorekeepersList = state.scorekeepersList.filter((scorekeeper) => (scorekeeper.id !== action.payload.id));
         })
         .addCase(deleteScorekeeper.rejected, (state, action) => {
            state.error = action.error.message;
         });
    }
})

export default scorekeepersSlice.reducer;