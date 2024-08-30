import { configureStore } from "@reduxjs/toolkit";
import songsReducer from "./slice/songsSlice";

export const store = configureStore({
    reducer: {
        songs: songsReducer
    }
})