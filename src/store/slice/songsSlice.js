import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const fetchSongs = createAsyncThunk(('songs/fetchSongs'), async() => {
    try {
        const response = await axios.get('https://cms.samespace.com/items/songs');
    const songs = response.data;
    } catch (e) {
        console.error(e)
    }
})


export const songsSlice = createSlice({
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
