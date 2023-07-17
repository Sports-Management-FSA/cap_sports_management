import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllPosts = createAsyncThunk("getPosts", async (_, { rejectWithValue }) => {
   try {
      const response = await axios.get("/api/posts");
      return response.data;
   } catch (ex) {
      return rejectWithValue(ex.response.data);
   }
});

export const addPost = createAsyncThunk("addPost", async (post, { rejectWithValue }) => {
   try {
      console.log(post);
      const token = window.localStorage.getItem("token");
      const response = await axios.post("/api/posts", post, {
         headers: {
            authorization: token
         }
      });
      return response.data;
   } catch (ex) {
      return rejectWithValue(ex.response.data);
   }
});

export const updatePost = createAsyncThunk("updatePost", async (formData, { rejectWithValue }) => {
   const { id } = formData;
   try {
      const response = await axios.put(`/api/posts/${id}`, formData);
      return response.data;
   } catch (ex) {
      return rejectWithValue(ex.response.data);
   }
});

export const deletePost = createAsyncThunk("deletePost", async (postId, { rejectWithValue }) => {
   try {
      await axios.delete(`/api/users/${postId}`);
   } catch (ex) {
      return rejectWithValue(ex.response.data);
   }
});

const postSlice = createSlice({
   name: "posts",
   initialState: {
      postList: [],
      loading: false,
      error: null
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(fetchAllPosts.pending, (state) => {
            state.loading = true;
         })
         .addCase(fetchAllPosts.fulfilled, (state, action) => {
            state.loading = false;
            state.postList.push(...action.payload);
         })
         .addCase(fetchAllPosts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
         })
         .addCase(addPost.pending, (state, action) => {
            state.loading = true;
         })
         .addCase(addPost.fulfilled, (state, action) => {
            state.loading = false;
            state.postList.push(action.payload);
         })
         .addCase(addPost.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
         })
         .addCase(updatePost.pending, (state, action) => {
            state.loading = true;
         })
         .addCase(updatePost.fulfilled, (state, action) => {
            state.loading = false;
            state.postList = state.postList.map((post) =>
               post.id !== action.payload.id ? post : action.payload
            );
         })
         .addCase(updatePost.rejected, (state, action) => {
            state.error = action.error.message;
         })
         .addCase(deletePost.pending, (state) => {
            state.loading = true;
         })
         .addCase(deletePost.fulfilled, (state, action) => {
            state.loading = false;
            state.postList = state.postList.filter((post) => (post.id !== action.payload.id));
         })
         .addCase(deletePost.rejected, (state, action) => {
            state.error = action.error.message;
         });
   }
});

export default postSlice.reducer;
