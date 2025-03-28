import React, { useRef, useState, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";
import { FaPlay, FaPause, FaForward, FaBackward, FaVolumeUp } from "react-icons/fa";
import { formatTime } from "../helper/helper";

const songs = [
    { title: "Song 1", artist: "Artist 1", src: "/songs/song1.mp3", cover: "https://i.scdn.co/image/ab67706f00000002af29338e415c87776e74a574" },
    { title: "Song 2", artist: "Artist 2", src: "/songs/song1.mp3", cover: "https://i.scdn.co/image/ab67706f00000002af29338e415c87776e74a574" },
    { title: "Song 3", artist: "Artist 3", src: "/songs/song1.mp3", cover: "https://i.scdn.co/image/ab67706f00000002af29338e415c87776e74a574" },
];

const MusicPlayer: React.FC = () => {
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [showVolume, setShowVolume] = useState(false);
    const waveRef = useRef<HTMLDivElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    const waveSurferRef = useRef<WaveSurfer | null>(null);

    useEffect(() => {
        if (waveRef.current) {
            waveSurferRef.current = WaveSurfer.create({
                container: waveRef.current,
                waveColor: "#ccc",
                progressColor: "#1DB954",
                barWidth: 3,
                // responsive: true,
                height: 40,
            });

            waveSurferRef.current.load(songs[currentSongIndex].src);
            waveSurferRef.current.on("ready", () => {
                setDuration(waveSurferRef.current?.getDuration() || 0);
            });

            waveSurferRef.current.on("audioprocess", () => {
                setCurrentTime(waveSurferRef.current?.getCurrentTime() || 0);
            });
        }

        return () => {
            waveSurferRef.current?.destroy();
        };
    }, [currentSongIndex]);

    const playPauseHandler = () => {
        if (isPlaying) {
            audioRef.current?.pause();
            waveSurferRef.current?.pause();
        } else {
            audioRef.current?.play();
            waveSurferRef.current?.play();
        }
        setIsPlaying(!isPlaying);
    };

    const nextSong = () => {
        setCurrentSongIndex((prev) => (prev + 1) % songs.length);
        setIsPlaying(false);
    };

    const prevSong = () => {
        setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
        setIsPlaying(false);
    };

    const volumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const seekTime = parseFloat(e.target.value);
        waveSurferRef.current?.seekTo(seekTime / duration);
        setCurrentTime(seekTime);
    };



    return (
        <div className="flex flex-col items-center justify-center bg-gray-900 text-white p-6 rounded-lg shadow-lg w-96 mx-auto mt-10 border border-gray-700 backdrop-blur-md">
            {/* Album Art */}
            <div className="w-40 h-40 rounded-lg overflow-hidden mb-4 shadow-lg">
                <img src={songs[currentSongIndex].cover} alt="Album Art" className="w-full h-full object-cover" />
            </div>


            {/* Song Title & Artist */}
            <h2 className="text-xl font-bold">{songs[currentSongIndex].title}</h2>
            <p className="text-sm text-gray-400">{songs[currentSongIndex].artist}</p>

            {/* Waveform Equalizer */}
            <div ref={waveRef} className="w-full my-4"></div>

            <audio ref={audioRef} src={songs[currentSongIndex].src} />

            {/* Progress Bar */}
            <div className="w-full flex justify-between items-center gap-5 my-3">
                <div className="w-full flex items-center space-x-2">
                    <span className="text-xs">{formatTime(currentTime)}</span>
                    <input
                        type="range"
                        min="0"
                        max={duration}
                        value={currentTime}
                        onChange={handleSeek}
                        className="w-full accent-green-500"
                    />
                    <span className="text-xs">{formatTime(duration)}</span>
                </div>
                {/* Volume Control (Small Button) */}
                <div className="relative">
                    <button
                        onClick={() => setShowVolume(!showVolume)}
                        className="text-gray-400 hover:text-white text-lg"
                    >
                        <FaVolumeUp />
                    </button>

                    {/* Volume Slider (Only shows when clicked) */}
                    {showVolume && (
                        <div className="absolute -bottom-10 left-[-60px] bg-gray-800 p-2 rounded-md shadow-lg">
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.1"
                                value={volume}
                                onChange={volumeChange}
                                className="w-20 accent-blue-500"
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-6 mt-2">
                <button onClick={prevSong} className="text-gray-400 hover:text-white text-2xl">
                    <FaBackward />
                </button>
                <button onClick={playPauseHandler} className="bg-green-500 p-4 rounded-full text-white text-2xl">
                    {isPlaying ? <FaPause /> : <FaPlay />}
                </button>
                <button onClick={nextSong} className="text-gray-400 hover:text-white text-2xl">
                    <FaForward />
                </button>


            </div>
        </div>
    );
};

export default MusicPlayer;
