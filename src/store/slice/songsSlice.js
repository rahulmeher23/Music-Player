import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSongs = createAsyncThunk("songs/fetchSongs", async () => {
  try {
    const response = await axios.get("https://cms.samespace.com/items/songs");
    const songs = response.data.data;
    return songs;
  } catch (e) {
    console.error(e);
  }
});

const songsSlice = createSlice({
  name: "songs",
  initialState: {
    songsList: [],
    songs: [],
    currentSong: null,
    loading: false,
    error: null,
  },
  reducers: {
    setCurrentSong: (state, action) => {
      const newSong = action.payload;
      //   const filterSong = state.songsList.filter(
      //     (song) => song.id === newSong.id
      //   );
      //   console.log(filterSong);
      console.log("newSong: ", newSong);
      return {
        ...state,
        currentSong: newSong,
      };
    },
    forYou: (state) => {
      state.songs = state.songsList;
    },
    topTracks: (state) => {
      const topTracks = state.songsList.filter(
        (song) => song.top_track === true
      );
      state.songs = topTracks;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSongs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSongs.fulfilled, (state, action) => {
        state.songsList = action.payload;
        state.songs = action.payload;
        state.loading = false;
        state.currentSong = action.payload[0];
      })
      .addCase(fetchSongs.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default songsSlice.reducer;
export const { setCurrentSong, forYou, topTracks } = songsSlice.actions;
