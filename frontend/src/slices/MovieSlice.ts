import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTrending, searchMovies, getMovieDetails } from "../services/movies";
import { Movie, MoviePage } from "../types/movie";

type MoviesState = {
  list: MoviePage | null;
  selected: Movie | null;
  q: string;
  status: "idle" | "loading" | "error";
  error?: string;
};

const initialState: MoviesState = {
  list: null,
  selected: null,
  q: "",
  status: "idle",
};

// Async thunks
export const fetchTrending = createAsyncThunk("movies/fetchTrending", async (page: number = 1) => {
  return await getTrending(page);
});

export const fetchSearch = createAsyncThunk(
  "movies/fetchSearch",
  async ({ q, page }: { q: string; page: number }) => {
    return await searchMovies(q, page);
  }
);

export const fetchDetails = createAsyncThunk("movies/fetchDetails", async (id: number) => {
  return await getMovieDetails(id);
});

// Slice
const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setQuery(state, action) {
      state.q = action.payload;
    },
    clearSelected(state) {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Trending
      .addCase(fetchTrending.pending, (s) => {
        s.status = "loading";
      })
      .addCase(fetchTrending.fulfilled, (s, a) => {
        s.status = "idle";
        s.list = a.payload;
      })
      .addCase(fetchTrending.rejected, (s, a) => {
        s.status = "error";
        s.error = a.error.message;
      })

      // Search
      .addCase(fetchSearch.pending, (s) => {
        s.status = "loading";
      })
      .addCase(fetchSearch.fulfilled, (s, a) => {
        s.status = "idle";
        s.list = a.payload;
      })
      .addCase(fetchSearch.rejected, (s, a) => {
        s.status = "error";
        s.error = a.error.message;
      })

      // Details
      .addCase(fetchDetails.pending, (s) => {
        s.status = "loading";
      })
      .addCase(fetchDetails.fulfilled, (s, a) => {
        s.status = "idle";
        s.selected = a.payload;
      })
      .addCase(fetchDetails.rejected, (s, a) => {
        s.status = "error";
        s.error = a.error.message;
      });
  },
});

export const { setQuery, clearSelected } = moviesSlice.actions;
export default moviesSlice.reducer;
