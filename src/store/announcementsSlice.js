import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllAnnouncements = createAsyncThunk("fetchAllAnnouncements", async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/announcements');
      return response.data;
    } catch(err){
        return rejectWithValue
    }
    }
);

export const addAnnouncement = createAsyncThunk('addAnnouncement', async(announcement, { rejectWithValue}) => {
    try {
        console.log('adding announcements')
        const token = window.localStorage.getItem('token');
        const response = await axios.post('/api/announcements', announcement, {
            headers: {
                authorization: token
            }
        })
        console.log(response.data)
        return response.data;
    } catch(err){
        return rejectWithValue('Not authorized to create announcement.');
    }
})


export const updateAnnouncement = createAsyncThunk("updateAnnouncement", async (formData, { rejectWithValue }) => {
    const { id } = formData;
    try {
      const token = window.localStorage.getItem('token');
      const response = await axios.put(`/api/announcements/${id}`, formData, {
        headers: {
            authorization: token
        }
    });
      return response.data;
    } catch(err){
        return rejectWithValue('Not authorized to update announcement.');
    }
    }
);

export const deleteAnnouncement = createAsyncThunk('deleteAnnouncement', async(id, {rejectWithValue}) => {
    try{
        await axios.delete(`/api/announcements/${id}`, {
            headers: {
                authorization: token
            }
        });
    }catch(err){
        return rejectWithValue('Not authorized to delete announcement.');;
    }
})


const announcementsSlice = createSlice({
    name: "announcements",
    initialState: {
        announcementsList: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchAllAnnouncements.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchAllAnnouncements.fulfilled, (state, action) => {
            
            state.loading = false;
            state.announcementsList.push(...action.payload);
        })
        .addCase(fetchAllAnnouncements.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(addAnnouncement.pending, (state) => {
            state.loading = true
        })
        .addCase(addAnnouncement.fulfilled, (state, action) => {
            state.loading = false;
            state.announcementsList.push(action.payload);
        })
        .addCase(addAnnouncement.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(updateAnnouncement.pending, (state) => {
            state.loading = true;
        })
        .addCase(updateAnnouncement.fulfilled, (state, action) => {
            state.loading = false;
            state.announcementsList.map(announcement => announcement.id !== action.payload.id ? announcement : action.payload);
        })
        .addCase(updateAnnouncement.rejected, (state, action) => {
            state.error = action.error.message;
        })
    }
})

export default announcementsSlice.reducer;