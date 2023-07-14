import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

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

export const updateMessage = createAsyncThunk("updateMessage", async (formData, { rejectWithValue }) => {
    const { id } = formData;
    try {
       const response = await axios.put(`/api/messages/${id}`, formData);
       return response.data;
    } catch (ex) {
       return rejectWithValue(ex.response.data);
    }
 });

const joinRequestSlice = createSlice({
    name: "requestMessages",
    initialState: {
        messagesList: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchAllMessages.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchAllMessages.fulfilled, (state, action) => {
            
            state.loading = false;
            state.messagesList.push(...action.payload);
        })
        .addCase(fetchAllMessages.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(addMessage.pending, (state) => {
            state.loading = true
        })
        .addCase(addMessage.fulfilled, (state, action) => {
            state.loading = false;
            state.messagesList.push(action.payload);
        })
        .addCase(addMessage.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(deleteMessage.pending, (state) => {
            state.loading = true;
        })
        .addCase(deleteMessage.fulfilled, (state, action) => {
            state.loading = false;
            state.messagesList.map(Message => Message.id !== action.payload.id ? Message : action.payload);
        })
        .addCase(deleteMessage.rejected, (state, action) => {
            state.error = action.error.message;
        })
        .addCase(updateMessage.pending, (state) => {
            state.loading = true;
        })
        .addCase(updateMessage.fulfilled, (state, action) => {
            state.loading = false;
            state.messagesList.map(Message => Message.id !== action.payload.id ? Message : action.payload);
        })
        .addCase(updateMessage.rejected, (state, action) => {
            state.error = action.error.message;
        })
    }
})

export default joinRequestSlice.reducer;
