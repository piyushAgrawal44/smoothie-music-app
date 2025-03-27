import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import SectionTitle from '../components/SectionTitle'
import Sidebar from '../components/Sidebar';
import data from '../data';
import Card from '../components/Card';
import Footer from '../components/Footer';
import BottomCTA from '../components/BottomCTA';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import SongListCard from '../components/SongListCard';
import SongListCard2 from '../components/SongListCard2';

export default function HomePage(props: any) {

    const slider = [
        {
            title: "Feel the Vibes",
            subtitle: "Chill with smooth beats",
            gradientColor: "bg-gradient-to-r from-[#ff7eb3] to-[#ff758c]",
            icon: "🎵"
        },
        {
            title: "Deep Relaxation",
            subtitle: "Find your inner peace",
            gradientColor: "bg-gradient-to-r from-[#36d1dc] to-[#5b86e5]",
            icon: "🌙"
        },
        // {
        //     title: "Energy Boost",
        //     subtitle: "Get hyped instantly",
        //     gradientColor: "bg-gradient-to-r from-[#ff9966] to-[#ff5e62]",
        //     icon: "⚡"
        // }
    ];
    const navigate=useNavigate();

    return (
        <>
            <div className='w-full bg-black text-gray-50 min-h-screen '>


                <div className="relative  flex flex-wrap">
                    <Sidebar active="home" />

                    <div className='p-2 min-h-screen w-full lg:w-[80%] lg:ml-[20%]'>
                        <Navbar page="home" />

                        <div className="w-full overflow-hidden mt-4">
                            <Swiper
                                modules={[Pagination, Autoplay]}
                                spaceBetween={20}
                                slidesPerView={1}
                                autoplay={{ delay: 3000, disableOnInteraction: true, pauseOnMouseEnter: true }}
                                pagination={{ clickable: true }}
                                className="rounded-md"
                            >
                                {slider.map((item, index) => (
                                    <SwiperSlide key={index}>
                                        <div className={`relative w-full p-6 py-10  text-white ${item.gradientColor} rounded-lg shadow-lg`}>
                                            <div className='flex flex-wrap justify-between items-center gap-4'>
                                                <div>
                                                    <div className="text-4xl mb-2">{item.icon}</div>
                                                    <h1 className="text-3xl font-bold">{item.title}</h1>
                                                    <p className="text-sm opacity-90 mt-1">{item.subtitle}</p>

                                                    {/* CTA Button */}
                                                    <button className="mt-3 px-4 py-2 bg-white text-black rounded-full text-sm font-semibold hover:bg-opacity-90 transition" onClick={()=>{
                                                        navigate("/search")
                                                    }}>
                                                        Explore
                                                    </button>
                                                </div>
                                                <div className='shrink-0'>
                                                    <SongListCard2 song={data.songs[index]} />
                                                </div>


                                            </div>
                                            <Link to="/" className="flex items-center gap-1 absolute lg:!bottom-2 right-5">
                                                <span className='text-xl md:text-3xl font-semibold whitespace-nowrap'><i className="bi bi-music-note-list"></i></span>
                                                <span className="md:text-xl  font-semibold whitespace-nowrap ">
                                                    Smoothie
                                                </span>
                                            </Link>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>


                        <div className='bg-[#121212] rounded-md p-2 mt-5 sm:mb-16'>
                            <div className='mb-7'>
                                <div className='flex flex-wrap items-center justify-between'>
                                    <SectionTitle text="Smoothie Playlist" />
                                    <Link to="/" className='text-sm hover:underline'>Show All <i className='bi bi-chevron-right'></i></Link>
                                </div>
                                <div className='mt-2 relative w-full overflow-x-auto hide-scrollbar flex flex-nowrap sm:flex-wrap'>

                                    {
                                        data.smoothie_playlist.map((image, index) => {
                                            return <Card key={index} index={index} image={image} />
                                        })
                                    }
                                </div>
                            </div>

                            <div className='mb-7'>
                                <div className='flex flex-wrap items-center justify-between'>
                                    <SectionTitle text="Sleep" />
                                    <Link to="/" className='text-sm hover:underline'>Show All <i className='bi bi-chevron-right'></i></Link>
                                </div>
                                <div className='mt-2 relative w-full overflow-x-auto hide-scrollbar flex flex-nowrap sm:flex-wrap'>

                                    {
                                        data.smoothie_playlist.map((image, index) => {
                                            return <Card key={index} image={image} />
                                        })
                                    }
                                </div>
                            </div>

                            <Footer />
                        </div>

                    </div>

                </div>


                <BottomCTA {...props} />

            </div>
        </>
    )
}
