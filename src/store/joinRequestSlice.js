import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {};

export const fetchAllMessages = createAsyncThunk("fetchAllMessages", async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/messages');
      return response.data;
    } catch(err){
        return rejectWithValue
    }
    }
);

export const addMessage = createAsyncThunk('addMessage', async(message, { rejectWithValue}) => {
    try {
        console.log('adding message')
        const token = window.localStorage.getItem('token');
        const response = await axios.post('/api/messages', message, {
            headers: {
                authorization: token
            }
        })
        console.log(response.data)
        return response.data;
    } catch(err){
        return rejectWithValue('Not authorized to create message.');
    }
})

export const deleteMessage = createAsyncThunk('deleteMessage', async(messageId, {rejectWithValue}) => {
    console.log('from delete message slice', messageId)
    try {
        await axios.delete(`/api/messages/${messageId}`, {
        })
    } catch (err){
        return rejectWithValue(err.response.data)
    }
})

const joinRequestSlice = createSlice({
    name: "requestMessages",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchAllMessages.fulfilled, (state, action) => {
            return action.payload;
        })
        .addCase(addMessage.fulfilled, (state, action) => {
            return action.payload;
        })
        .addCase(deleteMessage.fulfilled, (state, action) =>{
            return action.payload;
        })
    }
})

export default joinRequestSlice.reducer;
