import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllTeams = createAsyncThunk("getTeams", async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/teams');
      return response.data;
    } catch(err){
        return rejectWithValue
    }
    }
);
export const updateTeam = createAsyncThunk("updateTeam", async (formData, { rejectWithValue }) => {
    const { id } = formData;
    try {
      const response = await axios.put(`/api/teams/${id}`, formData);
      return response.data;
    } catch(err){
        return rejectWithValue
    }
    }
);


const teamSlice = createSlice({
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
        .addCase(fetchAllTeams.fulfilled, (action, state) => {
            state.loading = false;
            state.teamsList.push(action.payload);
        })
        .addCase(fetchAllTeams.rejected, (action, state) => {
            state.loading = false;
            state.error = action.error.message;
        })
    }
})

export default teamSlice.reducer;