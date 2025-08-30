import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { RootState } from "../store";


const API_URL =
  import.meta.env.VITE_API_URL || "https://savannah.kyuchristianunion.org/auth";

interface AuthState {
  token: string | null;
  refresh: string | null;
  user: any | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("token") || null,
  refresh: localStorage.getItem("refresh") || null,
  user: null,
  status: "idle",
  error: null,
};


export const loginUser = createAsyncThunk<
  { access: string; refresh: string },
  { email: string; password: string },
  { rejectValue: string }
>("auth/login", async ({ email, password }, thunkAPI) => {
  try {
    const res = await axios.post(`${API_URL}/jwt/create/`, { email, password });
    localStorage.setItem("token", res.data.access);
    localStorage.setItem("refresh", res.data.refresh);
    
    return res.data;
  } catch (err) {
    const error = err as AxiosError<any>;
    return thunkAPI.rejectWithValue(
      error.response?.data?.detail || "Login failed"
    );
  }
});


export const registerUser = createAsyncThunk<
  any,
  { email: string; password: string; username: string },
  { rejectValue: string }
>("auth/register", async (payload, thunkAPI) => {
  try {
    const res = await axios.post(`${API_URL}/users/`, payload);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<any>;
    return thunkAPI.rejectWithValue(
      error.response?.data?.detail || "Register failed"
    );
  }
});

// 🔹 Fetch User Profile
export const getUser = createAsyncThunk<
  any,
  void,
  { state: RootState; rejectValue: string }
>("auth/getUser", async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const token = state.auth.token;
  if (!token) return thunkAPI.rejectWithValue("No token found");

  try {
    const res = await axios.get(`${API_URL}/users/me/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    const error = err as AxiosError<any>;
    return thunkAPI.rejectWithValue(
      error.response?.data?.detail || "Failed to fetch user"
    );
  }
});

// 🔹 Refresh Token
export const refreshToken = createAsyncThunk<
  { access: string },
  void,
  { state: RootState; rejectValue: string }
>("auth/refresh", async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const refresh = state.auth.refresh;
  if (!refresh) return thunkAPI.rejectWithValue("No refresh token found");

  try {
    const res = await axios.post(`${API_URL}/jwt/refresh/`, { refresh });
    localStorage.setItem("token", res.data.access);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<any>;
    return thunkAPI.rejectWithValue(
      error.response?.data?.detail || "Token refresh failed"
    );
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.refresh = null;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("refresh");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<{ access: string; refresh: string }>) => {
          state.status = "succeeded";
          state.token = action.payload.access;
          state.refresh = action.payload.refresh;
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.token = action.payload.access;
      });
  },
});

export const { logout } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
