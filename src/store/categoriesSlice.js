import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllCategories = createAsyncThunk("getCategories", async (_, { rejectWithValue }) => {
   try {
      const response = await axios.get("/api/categories");
      return response.data;
   } catch (err) {
      return rejectWithValue;
   }
});

export const addCategory = createAsyncThunk("addCategory", async (category, { rejectWithValue }) => {
   try {
      const token = window.localStorage.getItem("token");
      const response = await axios.post("/api/categories", category, {
         headers: {
            authorization: token
         }
      });
      return response.data;
   } catch (err) {
      return rejectWithValue('Not authorized to create category.');
   }
});

export const updateCategory = createAsyncThunk("updateCategory", async (formData, { rejectWithValue }) => {
   const { id } = formData;
   try {
      const response = await axios.put(`/api/categories/${id}`, formData);
      return response.data;
   } catch (err) {
      return rejectWithValue('Not authorized to update category.');
   }
});

export const deleteCategory = createAsyncThunk('deleteCategory', async(categoryId, {rejectWithValue}) => {
    try{
        await axios.delete(`/api/categories/${categoryId}`);
        return(categoryId);
    }catch(err){
        return rejectWithValue('Not authorized to delete category.');
    }
})


const categoriesSlice = createSlice({
   name: "categories",
   initialState: {
      categoriesList: [],
      loading: false,
      error: null
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(fetchAllCategories.pending, (state) => {
            state.loading = true;
         })
         .addCase(fetchAllCategories.fulfilled, (state, action) => {
            state.loading = false;
            state.categoriesList.push(...action.payload);
         })
         .addCase(fetchAllCategories.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
         })
         .addCase(addCategory.pending, (state, action) => {
            state.loading = true;
         })
         .addCase(addCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.categoriesList.push(action.payload);
         })
         .addCase(addCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
         })
         .addCase(updateCategory.pending, (state) => {
            state.loading = true;
         })
         .addCase(updateCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.categoriesList = state.categoriesList.map((category) => (category.id !== action.payload.id ? category : action.payload));
         })
         .addCase(updateCategory.rejected, (state, action) => {
            state.error = action.error.message;
         })
         .addCase(deleteCategory.pending, (state) => {
            state.loading = true;
         })
         .addCase(deleteCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.categoriesList = state.categoriesList.filter((category) => (category.id !== action.payload.id));
         })
         .addCase(deleteCategory.rejected, (state, action) => {
            state.error = action.error.message;
         });
   }
});

export default categoriesSlice.reducer;