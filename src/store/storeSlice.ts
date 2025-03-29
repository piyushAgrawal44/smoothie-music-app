import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import data from "../data"; // Import song data

const songs = data.smoothie_playlist || [];

interface MusicPlayerState {
    currentSongIndex: number;
    isPlaying: boolean;
    volume: number;
    currentTime: number;
    duration: number;
    showVolume: boolean;
    songChanged: boolean;
}

const initialState: MusicPlayerState = {
    currentSongIndex: 0,
    isPlaying: false,
    volume: 1,
    currentTime: 0,
    duration: 0,
    showVolume: false,
    songChanged: false
};

const musicPlayerSlice = createSlice({
    name: "musicPlayer",
    initialState,
    reducers: {
        playPause(state) {
            state.isPlaying = !state.isPlaying;
        },
        playSelectedSong(state, action: PayloadAction<number>) {
            state.currentSongIndex = action.payload;
            state.isPlaying = true;
            state.currentTime = 0;
        },
        nextSong(state) {
            state.currentSongIndex = (state.currentSongIndex + 1) % songs.length;
            state.isPlaying = true;
            state.currentTime = 0;
        },
        prevSong(state) {
            state.currentSongIndex =
                (state.currentSongIndex - 1 + songs.length) % songs.length;
            state.isPlaying = true;
            state.currentTime = 0;
        },
        setVolume(state, action: PayloadAction<number>) {
            state.volume = action.payload;
        },
        setShowVolume(state, action: PayloadAction<boolean>) {
            state.showVolume = action.payload;
        },
        setCurrentTime(state, action: PayloadAction<number>) {
            state.currentTime = action.payload;
        },
        setDuration(state, action: PayloadAction<number>) {
            state.duration = action.payload;
        },
    },
});

export const { playPause, nextSong, prevSong, setVolume, setCurrentTime, setDuration, setShowVolume, playSelectedSong } =
    musicPlayerSlice.actions;
export default musicPlayerSlice.reducer;
