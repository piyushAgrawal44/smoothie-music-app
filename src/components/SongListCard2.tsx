import data from "../data"
import { RootState } from "../store/store";

import { useDispatch, useSelector } from "react-redux";
import { playPause, playSelectedSong } from "../store/storeSlice";
import { useMusicPlayer } from "../context/MusicPlayerContext";
export default function SongListCard2(props: any) {
    const songIndex = data.smoothie_playlist.findIndex((item) => item.id == props.song.id);
    const storeVariable = useSelector((state: RootState) => state.musicPlayer);
    const dispatch = useDispatch();
    const { audioRef, waveSurferRef } = useMusicPlayer();

    const playPauseHandler = () => {
        if(songIndex==storeVariable.currentSongIndex){
            if (storeVariable.isPlaying) {
                audioRef.current?.pause();
                waveSurferRef.current?.pause();
            } else {
                audioRef.current?.play();
                waveSurferRef.current?.play();
            }
            dispatch(playPause());
        }
        else{
            dispatch(playSelectedSong(songIndex));
        }
    };
    return (
        <>
            <div className="md:w-[400px] p-2 bg-[#282828] rounded-lg group relative overflow-hidden">
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <img src={props.song.thumbnail} className="object-contain rounded-md shrink-0 w-[40px] h-[40px] lg:w-[80px] lg:h-[80px]" alt="song" />
                    </div>
                    <div className="pe-10">
                        <h6 className="text-sm lg:text-lg line-clamp-1">{props.song.title}</h6>
                        <p className="text-[10px] lg:text-sm text-[#a7a7a7]">~ {props.song.author}</p>
                        <div className="flex gap-4 text-[10px] lg:text-sm mt-1 lg:mt-3">
                            <span className=" text-[#a7a7a7]">{props.song.duration}</span>
                            <span className=" text-[#a7a7a7] cursor-pointer"><i className="bi bi-heart"></i></span>
                        </div>
                    </div>
                </div>
                <div className='absolute bottom-0 right-0  transition-all left-0 w-full h-full flex justify-end items-end p-2'
                >
                    <div className="cursor-pointer rounded-full w-7 h-7 lg:w-10 lg:h-10 p-2 bg-green-400 text-black flex items-center justify-center" onClick={() => {
                        playPauseHandler();
                    }}>
                        {(songIndex == storeVariable.currentSongIndex && storeVariable.isPlaying) ? <><i className='bi bi-pause-fill'></i></> : <i className='bi bi-play-fill'></i>}
                    </div>
                </div>
            </div>

        </>
    )
}
