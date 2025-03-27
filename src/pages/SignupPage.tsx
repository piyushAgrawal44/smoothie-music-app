import Navbar from '../components/Navbar';
import { useEffect, useState } from 'react';

export default function SignupPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterCategory, setFilterCategory] = useState('All');

    const [searchLoading, setSearchLoading] = useState(false);

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

                    <div className='p-2 min-h-screen w-full '>
                        <Navbar page="login" />

                        <div className='w-full p-2.5 flex justify-center'>
                            <div className="max-w-96">
                                <h3 className='my-2.5 text-2xl font-bold'>Signup, and Feel Smoothie</h3>
                                <div>
                                    <div className='mb-2.5'>
                                        <label htmlFor="" className='text-sm font-semibold mb-2'>Name</label>
                                        <input type="text" className='block w-full bg-transparent p-2.5 rounded-md border ' placeholder='Raghuwansi Ram' />
                                    </div>

                                    <div className='mb-2.5'>
                                        <label htmlFor="" className='text-sm font-semibold mb-2'>Email</label>
                                        <input type="email" className='block w-full bg-transparent p-2.5 rounded-md border ' placeholder='name@domain.com' />
                                    </div>

                                    <div className='mb-2.5'>
                                        <label htmlFor="" className='text-sm font-semibold mb-2'>Password</label>
                                        <input type="password" className='block w-full bg-transparent p-2.5 rounded-md border ' placeholder='******' />
                                    </div>

                                    <div className='my-2.5'>
                                        <button type="button" className={`w-full py-3 px-5 text-[12px] font-medium text-black transition-all bg-white hover:bg-gray-100 focus:bg-gray-100 hover:scale-105 focus:scale-105 rounded-[24px] truncate`} onClick={() => { }}>Sign Up</button>

                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>

                </div>
            </div >
        </>
    )
}
