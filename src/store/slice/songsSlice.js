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
    isPlaying: true,
    loading: false,
    error: null,
  },
  reducers: {
    filterSearch: (state, action) => {
      const searchQuery = action.payload;
      let filteredSongs = [];
      if (state.searchQuery === "") {
        filteredSongs = state.songsList; // Show all songs if the search query is empty or just spaces
      } else {
        filteredSongs = state.songsList.filter(
          (song) =>
            song.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            song.artist.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // if (state.searchQuery === "") {
      //   state.filteredSongs = state.songsList; // Show all songs if the search query is empty or just spaces
      // } else {
      //   state.filteredSongs = state.songsList.filter(
      //     (song) =>
      //       song.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
      //       song.artist.toLowerCase().includes(state.searchQuery.toLowerCase())
      //   );
      // }
      state.songs = filteredSongs;
    },

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
        isPlaying: true,
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

    pause: (state) => {
      state.isPlaying = false;
    },

    play: (state) => {
      state.isPlaying = true;
    },

    forward: (state) => {
      if (state.currentSong) {
        const currentIndex = state.songsList.findIndex(
          (song) => song.id === state.currentSong.id
        );
        const nextIndex = (currentIndex + 1) % state.songsList.length;
        state.currentSong = state.songsList[nextIndex];
        state.isPlaying = true;
      }
    },

    previous: (state) => {
      if (state.currentSong) {
        const currentIndex = state.songsList.findIndex(
          (song) => song.id === state.currentSong.id
        );
        const prevIndex =
          (currentIndex - 1 + state.songsList.length) % state.songsList.length;
        state.currentSong = state.songsList[prevIndex];
        state.isPlaying = true;
      }
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
export const {
  setCurrentSong,
  forYou,
  topTracks,
  play,
  pause,
  forward,
  previous,
  filterSearch,
} = songsSlice.actions;
