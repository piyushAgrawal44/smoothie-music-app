import React, { createContext, useContext, useRef } from "react";
import WaveSurfer from "wavesurfer.js";

// Define the type for the context
interface MusicPlayerContextType {
    audioRef: React.RefObject<HTMLAudioElement>;
    waveSurferRef: React.MutableRefObject<WaveSurfer | null>;
}

// Create the context
const MusicPlayerContext = createContext<MusicPlayerContextType | null>(null);

// Provide the context to the entire app
export const MusicPlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const waveSurferRef = useRef<WaveSurfer | null>(null);

    return (
        <MusicPlayerContext.Provider value={{ audioRef, waveSurferRef }}>
            {children}
        </MusicPlayerContext.Provider>
    );
};

// Custom hook to use the context
export const useMusicPlayer = () => {
    const context = useContext(MusicPlayerContext);
    if (!context) {
        throw new Error("useMusicPlayer must be used within a MusicPlayerProvider");
    }
    return context;
};
