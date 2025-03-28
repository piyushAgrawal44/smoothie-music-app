import React, { useRef, useState, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";
import { FaPlay, FaPause, FaForward, FaBackward, FaVolumeUp, } from "react-icons/fa";
import { formatTime } from "../helper/helper";

const songs = [
    { title: "Song 1", artist: "Artist 1", src: "/songs/song1.mp3", cover: "https://i.scdn.co/image/ab67706f00000002af29338e415c87776e74a574" },
    { title: "Song 2", artist: "Artist 2", src: "/songs/song1.mp3", cover: "https://i.scdn.co/image/ab67706f00000002af29338e415c87776e74a574" },
    { title: "Song 3", artist: "Artist 3", src: "/songs/song1.mp3", cover: "https://i.scdn.co/image/ab67706f00000002af29338e415c87776e74a574" },
    { title: "Song 4", artist: "Artist 4", src: "/songs/song1.mp3", cover: "https://i.scdn.co/image/ab67706f00000002af29338e415c87776e74a574" },
    { title: "Song 5", artist: "Artist 5", src: "/songs/song1.mp3", cover: "https://i.scdn.co/image/ab67706f00000002af29338e415c87776e74a574" },
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
                height: 35,
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
    const [playMenuOpen, setPlayMenuOpen] = useState(false);

    return (
        <div className="absolute w-[calc(100%-30px)] left-[15px] bottom-5">
            <div className={`bg-gray-900 text-white px-6 py-2 rounded-lg drop-shadow-lg border border-gray-700 backdrop z-40 ${playMenuOpen?"absolute":"hidden"} w-full left-0 bottom-0`}>

                {/* Progress Bar */}
                <div className="w-full flex md:hidden justify-between items-center gap-5 ">
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
                            className="text-gray-400 hover:text-white text-lg mt-2"
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
                <div className="flex justify-between">
                    <div className="flex items-center gap-2 shrink-0">
                        {/* Album Art */}
                        <div className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] rounded-lg overflow-hidden shadow-lg">
                            <img src={songs[currentSongIndex].cover} alt="Album Art" className="w-full h-full object-cover" />
                        </div>
                        <div className="">
                            {/* Song Title & Artist */}
                            <h2 className=" md:text-xl font-bold line-clamp-1">{songs[currentSongIndex].title}</h2>
                            <p className="text-xs md:text-sm text-gray-400 line-clamp-1">{songs[currentSongIndex].artist}</p>
                        </div>
                    </div>
                    {/* Progress Bar */}
                    <div className="hidden md:flex justify-between items-center gap-5 my-3">
                        {/* Song Details & Controls */}
                        <div className="flex gap-2 items-center">
                            <span className="text-xs">{formatTime(currentTime)}</span>
                            <div className="flex flex-col w-[150px] md:w-[400px]">
                                {/* Waveform Equalizer */}
                                <div ref={waveRef} className="w-full my-2"></div>
                                <audio ref={audioRef} src={songs[currentSongIndex].src} />
                            </div>
                            <span className="text-xs">{formatTime(duration)}</span>
                        </div>
                        <div className="relative">
                            <button
                                onClick={() => setShowVolume(!showVolume)}
                                className="text-gray-400 hover:text-white text-sm md:text-lg mt-1"
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
                    <div className="flex items-center space-x-3 md:space-x-6 mt-2">
                        <button onClick={prevSong} className="text-gray-400 hover:text-white text-lg md:text-2xl">
                            <FaBackward />
                        </button>
                        <button onClick={playPauseHandler} className="bg-green-500 p-3 md:p-4 rounded-full text-white text-sm md:text-xl">
                            {isPlaying ? <FaPause /> : <FaPlay />}
                        </button>
                        <button onClick={nextSong} className="text-gray-400 hover:text-white text-lg md:text-2xl">
                            <FaForward />
                        </button>
                    </div>
                </div>

            </div>
            <button className="bg-white text-black w-6 h-6 flex justify-center items-center text-sm rounded-full absolute -top-3 -right-1 z-50 " onClick={()=>{setPlayMenuOpen(!playMenuOpen)}}><i className={`bi ${playMenuOpen?'bi-chevron-double-down':'bi-chevron-double-up'}`}></i></button>
        </div>
    );
};

export default MusicPlayer;
