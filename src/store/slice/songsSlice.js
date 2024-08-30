import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSongs = createAsyncThunk(('songs/fetchSongs'), async() => {
    try {
        const response = await axios.get('https://cms.samespace.com/items/songs');
        const songs = response.data;
        return songs
    } catch (e) {
        console.error(e)
    }
})


const songsSlice = createSlice({
    name: 'songs',
    initialState: {
        songsList: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSongs.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchSongs.fulfilled, (state, action) => {
                state.songsList = action.payload;
                state.loading = false
            })
            .addCase(fetchSongs.rejected, (state, action) => {
                state.error = action.error.message
            })
    }
})

export default songsSlice.reducer
