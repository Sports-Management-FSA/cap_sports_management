import { create } from "@mui/material/styles/createTransitions";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateAvatar = createAsyncThunk("updateAvatar", async (payload) => {
   try {
      const token = window.localStorage.getItem("token");
      const response = await axios.put("/api/auth", payload, {
         headers: {
            authorization: token
         }
      });
      return response.data;
   } catch (err) {
      console.log(err);
   }
});

export const loginWithToken = createAsyncThunk("loginWithToken", async (_, { rejectWithValue }) => {
   const token = window.localStorage.getItem("token");
   if (token) {
      const response = await axios.get("/api/auth", {
         headers: {
            authorization: token
         }
      });
      return response.data;
   } else {
      return rejectWithValue();
   }
});

export const attemptLogin = createAsyncThunk("attemptLogin", async (formData, { rejectWithValue }) => {
   try {
      let response = await axios.post("/api/auth", formData);
      window.localStorage.setItem("token", response.data);
      response = await axios.get("/api/auth", {
         headers: {
            authorization: response.data
         }
      });
      return { loggedIn: true, ...response.data };
   } catch (ex) {
      return rejectWithValue(ex.response.data);
   }
});

export const attemptSignup = createAsyncThunk("attemptSignup", async (formData, { rejectWithValue, dispatch }) => {
   try {
      let response = await axios.post("/api/auth/register", formData);
      window.localStorage.setItem("token", response.data);
      response = await axios.get("/api/auth", {
         headers: {
            authorization: response.data
         }
      });
      return response.data;
   } catch (ex) {
      console.error(ex);
      return rejectWithValue(ex.response.data);
   }
});

export const updateUser = createAsyncThunk("updateUser", async (formData, { rejectWithValue }) => {
   try {
      const token = window.localStorage.getItem("token");
      if (!token) {
         throw new Error("No token found");
      }
      const response = await axios.put("/api/auth", formData, {
         headers: {
            authorization: token
         }
      });

      return response.data;
   } catch (err) {
      return rejectWithValue(err.response.data);
   }
});

export const updatePassword = createAsyncThunk(
   "updatePassword",
   async ({ currentPassword, newPassword }, { rejectWithValue }) => {
      try {
         const token = window.localStorage.getItem("token");
         if (!token) {
            throw new Error("No token found");
         }

         const response = await axios.put(
            "/api/auth/password",
            { currentPassword, newPassword },
            {
               headers: {
                  authorization: token
               }
            }
         );

         return response.data;
      } catch (err) {
         return rejectWithValue(err.response.data);
      }
   }
);

const authSlice = createSlice({
   name: "auth",
   initialState: { loggedIn: false },
   reducers: {
      logout: (state) => {
         window.localStorage.removeItem("token");
         return { loggedIn: false };
      }
   },
   extraReducers: (builder) => {
      builder.addCase(loginWithToken.fulfilled, (state, action) => {
         return { loggedIn: true, ...action.payload };
      });
      builder.addCase(attemptLogin.fulfilled, (state, action) => {
         return { loggedIn: true, ...action.payload };
      });
      builder.addCase(updateAvatar.fulfilled, (state, action) => {
         return { ...state, ...action.payload };
      });
      builder.addCase(attemptSignup.fulfilled, (state, action) => {
         return { loggedIn: true, ...action.payload };
      });
      builder.addCase(updateUser.fulfilled, (state, action) => {
         return { loggedIn: true, ...action.payload };
      });
      builder.addCase(updatePassword.fulfilled, (state, action) => {
         return { ...state, ...action.payload };
      });
   }
});
const { logout } = authSlice.actions;

export { logout };

export default authSlice.reducer;
