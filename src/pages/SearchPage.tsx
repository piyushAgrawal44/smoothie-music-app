import Navbar from '../components/Navbar'
import SectionTitle from '../components/SectionTitle'
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import BottomCTA from '../components/BottomCTA';
import CategoryCard from '../components/CategoryCard';
import { useEffect, useState } from 'react';
import SongListCard from '../components/SongListCard';
import Card from '../components/Card';
import data from "../data"
import { RootState } from "../store/store";

import { useDispatch, useSelector } from "react-redux";
import { playPause, playSelectedSong } from "../store/storeSlice";
import { useMusicPlayer } from "../context/MusicPlayerContext";

export default function SearchPage(props: any) {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterCategory, setFilterCategory] = useState('All');

    const [searchLoading, setSearchLoading] = useState(false);

    const songIndex=0;
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

    const searchUserQuery = () => {

        // I am not doing any data fetching right know but we can easily do that here 

        setTimeout(() => {
            setSearchLoading(false);
        }, 1200); // 1200 ms
    }

    useEffect(() => {
        setSearchLoading(true); // show skeleton loader
        searchUserQuery();
        // eslint-disable-next-line
    }, [searchQuery]);
    return (
        <>
            <div className='w-full bg-black text-gray-50 min-h-[calc(100vh-50px)] xm:min-h-screen '>


                <div className="relative  flex flex-wrap">
                    <Sidebar active="search" />

                    <div className='p-2 min-h-screen w-full lg:w-[80%] lg:ml-[20%]'>
                        <Navbar page="search" setSearchQuery={setSearchQuery} />

                        {searchQuery.length > 0 && !searchLoading && <div className='mt-2 flex flex-nowrap gap-3 overflow-x-auto hide-scrollbar items-center'>
                            {
                                data.search_result_category.map((category, index) => {
                                    return <div key={index} onClick={() => { setFilterCategory(category) }} className={`px-2 py-1 text-[12px] rounded-[16px] min-w-fit ${filterCategory === category ? 'bg-gray-50 text-gray-900' : 'bg-[#242424] text-gray-50'}`}>
                                        {category}
                                    </div>
                                })
                            }

                        </div>
                        }

                        <div className='bg-[#121212] rounded-md p-2 mt-2 sm:mb-16 relative'>


                            {
                                searchQuery.length > 0 && !searchLoading && <div>
                                    <div className='mb-7 flex flex-wrap'>
                                        <div className='p-2 w-full sm:w-[35%]'>
                                            <div className='flex flex-wrap items-center justify-between'>
                                                <SectionTitle text="Top result" />
                                            </div>
                                            <div className='mt-1 relative w-full overflow-hidden flex flex-nowrap sm:flex-wrap group'>
                                                <div className='bg-[#181818] hover:bg-[#282828] rounded-md py-4 px-5 w-full'>
                                                    <img src={data.smoothie_playlist[0].thumbnail} className='rounded-md max-w-[80px]' alt="" />
                                                    <h6 className='text-xl font-bold mt-2 line-clamp-1'>{data.smoothie_playlist[0].title}</h6>
                                                    <p className='text-[10px] mt-1'><span className='text-[#a7a7a7]'>Song</span> ~ <span>{data.smoothie_playlist[0].author}</span></p>
                                                </div>
                                                <div className='absolute bottom-[10px] xm:bottom-[-100%] xm:group-hover:bottom-[10px] transition-all right-[10px]   bg-[]'>
                                                    <div className="cursor-pointer rounded-full w-7 h-7 lg:w-10 lg:h-10 p-2 bg-green-400 text-black flex items-center justify-center" onClick={() => {
                                                        playPauseHandler();
                                                    }}>
                                                        {(songIndex == storeVariable.currentSongIndex && storeVariable.isPlaying) ? <><i className='bi bi-pause-fill'></i></> : <i className='bi bi-play-fill'></i>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='p-2 w-full sm:w-[65%]'>
                                            <div className='flex flex-wrap items-center justify-between'>
                                                <SectionTitle text="Songs" />
                                            </div>
                                            <div className='mt-1 relative w-full flex flex-wrap max-h-[250px] overflow-auto custom_scrollbar'>
                                                {
                                                    data.smoothie_playlist.map((song, index) => {
                                                        return <div key={index} className='w-full mb-2'>
                                                            <SongListCard song={song} />
                                                        </div>
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    <div className='mb-7'>
                                        <div className='flex flex-wrap items-center justify-between'>
                                            <SectionTitle text="Featuring" />
                                        </div>
                                        <div className='mt-2 relative w-full overflow-x-auto hide-scrollbar flex flex-nowrap '>

                                            {
                                                data.smoothie_playlist.map((image, index) => {
                                                    return <Card key={index} index={index} image={image} />
                                                })
                                            }
                                        </div>
                                    </div>

                                    <div className='mb-7'>
                                        <div className='flex flex-wrap items-center justify-between'>
                                            <SectionTitle text="Artists" />
                                        </div>
                                        <div className='mt-2 relative w-full overflow-x-auto hide-scrollbar flex flex-nowrap '>

                                            {
                                                data.smoothie_playlist.map((image, index) => {
                                                    return <Card key={index} index={index} image={image} image_rounded={true} />
                                                })
                                            }
                                        </div>
                                    </div>

                                    <div className='mb-7'>
                                        <div className='flex flex-wrap items-center justify-between'>
                                            <SectionTitle text="Albums" />
                                        </div>
                                        <div className='mt-2 relative w-full overflow-x-auto hide-scrollbar flex flex-nowrap '>

                                            {
                                                data.smoothie_playlist.map((image, index) => {
                                                    return <Card key={index} index={index} image={image} />
                                                })
                                            }
                                        </div>
                                    </div>

                                    <div className='mb-7'>
                                        <div className='flex flex-wrap items-center justify-between'>
                                            <SectionTitle text="Playlists" />
                                        </div>
                                        <div className='mt-2 relative w-full overflow-x-auto hide-scrollbar flex flex-nowrap '>

                                            {
                                                data.smoothie_playlist.map((image, index) => {
                                                    return <Card key={index} index={index} image={image} />
                                                })
                                            }
                                        </div>
                                    </div>

                                    <div className='mb-7'>
                                        <div className='flex flex-wrap items-center justify-between'>
                                            <SectionTitle text="Podcasts" />
                                        </div>
                                        <div className='mt-2 relative w-full overflow-x-auto hide-scrollbar flex flex-nowrap '>

                                            {
                                                data.smoothie_playlist.map((image, index) => {
                                                    return <Card key={index} index={index} image={image} />
                                                })
                                            }
                                        </div>
                                    </div>

                                    <div className='mb-7'>
                                        <div className='flex flex-wrap items-center justify-between'>
                                            <SectionTitle text="Episodes" />
                                        </div>
                                        <div className='mt-2 relative w-full overflow-x-auto hide-scrollbar flex flex-nowrap '>

                                            {
                                                data.smoothie_playlist.map((image, index) => {
                                                    return <Card key={index} index={index} image={image} />
                                                })
                                            }
                                        </div>
                                    </div>

                                    <div className='mb-7'>
                                        <div className='flex flex-wrap items-center justify-between'>
                                            <SectionTitle text="Profiles" />
                                        </div>
                                        <div className='mt-2 relative w-full overflow-x-auto hide-scrollbar flex flex-nowrap'>

                                            {
                                                data.smoothie_playlist.map((image, index) => {
                                                    return <Card key={index} index={index} image={image} image_rounded={true} />
                                                })
                                            }
                                        </div>
                                    </div>

                                    <div className='mb-7'>
                                        <div className='flex flex-wrap items-center justify-between'>
                                            <SectionTitle text="Genres & Modes" />
                                        </div>
                                        <div className='mt-2 relative w-full overflow-x-auto hide-scrollbar flex flex-nowrap'>

                                            {
                                                data.smoothie_playlist.map((image, index) => {
                                                    return <Card key={index} index={index} image={image} display_desc={false} />
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            }
                            {
                                !searchQuery && !searchLoading && <div className='mb-7'>
                                    <div className='flex flex-wrap items-center justify-between'>
                                        <SectionTitle text="Browse all" />
                                    </div>
                                    <div className='mt-2 relative w-full overflow-x-auto hide-scrollbar flex flex-nowrap sm:flex-wrap' onClick={()=>{setSearchQuery("song")}}>

                                        {
                                            data.smoothie_categories.map((image, index) => {
                                                return <CategoryCard key={index} index={index} image={image} />
                                            })
                                        }
                                    </div>
                                </div>
                            }

                            {
                                searchLoading && searchQuery.length > 0 && <div className="flex flex-wrap justify-center sm:justify-start w-full relative">
                                    <div className="p-2 w-full xm:w-[50%] lg:w-[35%]">
                                        <div className="w-full h-[190px]  rounded-sm animate-shimmer">
                                        </div>
                                    </div>
                                    <div className="p-2 w-full xm:w-[50%] lg:w-[65%]">
                                        <div className="mb-2 w-full h-[40px] mx-auto  rounded-sm animate-shimmer">
                                        </div>
                                        <div className="mb-2 w-full h-[40px] mx-auto  rounded-sm animate-shimmer">
                                        </div>
                                        <div className="mb-2 w-full h-[40px] mx-auto  rounded-sm animate-shimmer">
                                        </div>
                                        <div className="w-full h-[40px] mx-auto  rounded-sm animate-shimmer">
                                        </div>
                                    </div>
                                </div>
                            }

                            {
                                searchLoading && !searchQuery && <div className="flex flex-wrap justify-center sm:justify-start w-full relative">
                                    <div className="p-2 min-w-[150px] w-full xm:min-w-[50%] xm:w-[50%] sm:min-w-[33%] sm:w-[33%] md:min-w-[20%] md:w-[20%]">
                                        <div className="w-full h-[150px]  rounded-md animate-shimmer">
                                        </div>
                                    </div>

                                    <div className="p-2 min-w-[150px] w-full xm:min-w-[50%] xm:w-[50%] sm:min-w-[33%] sm:w-[33%] md:min-w-[20%] md:w-[20%]">
                                        <div className="w-full h-[150px]  rounded-md animate-shimmer">
                                        </div>
                                    </div>

                                    <div className="p-2 min-w-[150px] w-full xm:min-w-[50%] xm:w-[50%] sm:min-w-[33%] sm:w-[33%] md:min-w-[20%] md:w-[20%]">
                                        <div className="w-full h-[150px]  rounded-md animate-shimmer">
                                        </div>
                                    </div>

                                    <div className="p-2 min-w-[150px] w-full xm:min-w-[50%] xm:w-[50%] sm:min-w-[33%] sm:w-[33%] md:min-w-[20%] md:w-[20%]">
                                        <div className="w-full h-[150px]  rounded-md animate-shimmer">
                                        </div>
                                    </div>
                                </div>
                            }

                            <div >


                            </div>


                            <Footer />
                        </div>

                    </div>

                </div>


                <BottomCTA {...props} />

            </div >
        </>
    )
}
