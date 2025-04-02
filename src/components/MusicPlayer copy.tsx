import React, { useRef, useState, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";
import { FaPlay, FaPause, FaForward, FaBackward, FaVolumeUp } from "react-icons/fa";
import { formatTime } from "../helper/helper";
import data from "../data";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { nextSong, playPause, prevSong, setCurrentTime, setDuration, setShowVolume, setVolume } from "../store/storeSlice";
import AudioPlayingAnimation from "./ui/AudioPlayingAnimation";
import { useLocation } from "react-router-dom";

const songs = data.smoothie_playlist || [];

const MusicPlayer: React.FC = () => {
    const dispatch = useDispatch();
    const { currentSongIndex, isPlaying, volume, currentTime, duration, showVolume } = useSelector((state: RootState) => state.musicPlayer);

    const waveRef = useRef<HTMLDivElement>(null);
    const waveSurferRef = useRef<WaveSurfer | null>(null);

    // 🛠️ WaveSurfer Initialize & Destroy
    useEffect(() => {
        if (waveRef.current) {
            if (waveSurferRef.current) {
                waveSurferRef.current.destroy(); // Purana destroy karo
            }

            waveSurferRef.current = WaveSurfer.create({
                container: waveRef.current,
                waveColor: "#ccc",
                progressColor: "#1DB954",
                barWidth: 3,
                height: 35,
            });

            waveSurferRef.current.load(songs[currentSongIndex].src);

            waveSurferRef.current.on("ready", () => {
                dispatch(setDuration(waveSurferRef.current?.getDuration() || 0));
            });

            waveSurferRef.current.on("audioprocess", () => {
                dispatch(setCurrentTime(waveSurferRef.current?.getCurrentTime() || 0));
            });

            waveSurferRef.current.on("finish", () => {
                nextSongHelper();
            });

            waveSurferRef.current.setVolume(volume); // Set initial volume
        }

        return () => {
            waveSurferRef.current?.destroy();
        };
    }, [currentSongIndex]);

    // 🟢 Play/Pause Handle
    useEffect(() => {
        if (waveSurferRef.current) {
            if (isPlaying) {
                waveSurferRef.current.play();
            } else {
                waveSurferRef.current.pause();
            }
        }
    }, [isPlaying]);

    const playPauseHandler = () => {
        if (waveSurferRef.current) {
            if (isPlaying) {
                waveSurferRef.current.pause();
            } else {
                waveSurferRef.current.play();
            }
            dispatch(playPause());
        }
    };

    // 🔄 Next/Prev Song
    const nextSongHelper = () => {
        waveSurferRef.current?.stop();
        dispatch(nextSong());
    };

    const prevSongHelper = () => {
        waveSurferRef.current?.stop();
        dispatch(prevSong());
    };

    // 🔊 Volume Control
    const volumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        dispatch(setVolume(newVolume));
        waveSurferRef.current?.setVolume(newVolume);
    };

    // ⏩ Seek Handle
    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const seekTime = parseFloat(e.target.value);
        if (waveSurferRef.current) {
            waveSurferRef.current.seekTo(seekTime / duration);
        }
        dispatch(setCurrentTime(seekTime));
    };

    const [playMenuOpen, setPlayMenuOpen] = useState(false);
    const currentUrl = useLocation();

    return (
        <div className="absolute w-[calc(100%-30px)] left-[15px] bottom-5">
            <div className={`bg-gray-900 text-white px-6 py-2 rounded-lg drop-shadow-lg border border-gray-700 backdrop z-40 ${playMenuOpen ? "absolute" : "hidden"} w-full left-0 bottom-0`}>
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
                    <div className="relative">
                        <button onClick={() => dispatch(setShowVolume(!showVolume))} className="text-gray-400 hover:text-white text-lg mt-2">
                            <FaVolumeUp />
                        </button>
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
                        <div className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] rounded-lg overflow-hidden shadow-lg">
                            <img src={songs[currentSongIndex].thumbnail} alt="Album Art" className="w-full h-full object-cover" />
                        </div>
                        <div className="">
                            <h2 className="md:text-xl font-bold line-clamp-1">{songs[currentSongIndex].title}</h2>
                            <p className="text-xs md:text-sm text-gray-400 line-clamp-1">{songs[currentSongIndex].author}</p>
                        </div>
                    </div>

                    <div className="hidden md:flex justify-between items-center gap-5 my-3">
                        <div className="flex gap-2 items-center">
                            <span className="text-xs">{formatTime(currentTime)}</span>
                            <div className="flex flex-col w-[150px] md:w-[400px]">
                                <div ref={waveRef} className="w-full my-2"></div>
                            </div>
                            <span className="text-xs">{formatTime(duration)}</span>
                        </div>
                        <div className="relative">
                            <button onClick={() => dispatch(setShowVolume(!showVolume))} className="text-gray-400 hover:text-white text-sm md:text-lg mt-1">
                                <FaVolumeUp />
                            </button>
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

                    <div className="flex items-center space-x-3 md:space-x-6 mt-2">
                        <button onClick={prevSongHelper} className="text-gray-400 hover:text-white text-lg md:text-2xl">
                            <FaBackward />
                        </button>
                        <button onClick={playPauseHandler} className="bg-green-500 p-3 md:p-4 rounded-full text-white text-sm md:text-xl">
                            {isPlaying ? <FaPause /> : <FaPlay />}
                        </button>
                        <button onClick={nextSongHelper} className="text-gray-400 hover:text-white text-lg md:text-2xl">
                            <FaForward />
                        </button>
                    </div>
                </div>
            </div>
            {(currentUrl.pathname == "/" || currentUrl.pathname == "/search") && <button type="button" className={`bg-gray-50 text-black  flex justify-center items-center  ${playMenuOpen ? 'rounded-full w-6 h-6 -top-3 -right-1 text-sm ' : 'rounded-lg w-10 h-10 -top-10 -right-0 text-lg'} absolute  z-50`} onClick={() => { setPlayMenuOpen(!playMenuOpen) }}>
                {(isPlaying && !playMenuOpen) ? <AudioPlayingAnimation /> : <i className={`bi ${playMenuOpen ? 'bi-chevron-double-down' : 'bi-play-fill'}`}></i>}
            </button>}
        </div>
    );
};

export default MusicPlayer;
