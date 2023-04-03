import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getVideos } from "./videosAPI";
import { getAllVideos } from "../pagination/paginationAPI";

const initialState = {
  videos: [],
  allVideos: [],
  isLoading: false,
  isError: false,
  error: "",
  currentPage: 1,
  totalPages: null,
};

//async thunk
export const fetchVideos = createAsyncThunk("videos/fetchVideos", async ({currentPage, tags, searchText}) => {
  const videos = await getVideos(currentPage, tags, searchText);
  return videos;
});

export const fetchAllVideos = createAsyncThunk("videos/fetchAllVideos", async () => {
  const allVideos = await getAllVideos();
  return allVideos;
});

const videosSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideos.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.videos = action.payload;
      })
      .addCase(fetchAllVideos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allVideos = action.payload;
        state.totalPages = Math.ceil(action.payload.length / 8);
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.isLoading = false;
        state.videos = [];
        state.isError = true;
        state.error = action.error?.message;
      });
  },
});
export const {setCurrentPage} = videosSlice.actions;
export default videosSlice.reducer;
