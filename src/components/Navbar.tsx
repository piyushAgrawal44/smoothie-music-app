import { Link, useLocation, useNavigate } from "react-router-dom";
import TransparentButton from "./TransparentButton";
import WhiteButton from "./WhiteButton";
import { useEffect, useState } from "react";

export default function Navbar(props: any) {

  const navigate = useNavigate();
  const currentLocation = useLocation();
  const [userQuery, setUserQuery] = useState('');

  useEffect(() => {

    const timeOutId = setTimeout(() => {
      props?.setSearchQuery(userQuery);
    }, 1000);
    return () => clearTimeout(timeOutId);


    // eslint-disable-next-line
  }, [userQuery]);

  const canGoBack = true;


  return (
    <>

      <div className={`w-full overflow-x-hidden sticky z-10 ${props.page === 'search' ? 'flex' : 'hidden'} lg:flex top-0  items-center justify-between px-2 py-2 bg-[#000000]`}>
        <div className={`w-full lg:w-fit flex items-center justify-between gap-2`}>
          <div className="text-xl flex items-center justify-between gap-2">
            {currentLocation.pathname == "/" ? (
              <>
                <button onClick={()=>{navigate('/search')}}>
                  <div className="relative group cursor-pointer w-full">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 ">
                      <svg className="w-4 h-4 text-[#a7a7a7] group-hover:text-gray-50" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                      </svg>
                    </div>
                    <p  className="max-w-[200px] lg:max-w-[500px] w-max shrink block p-3 ps-8 sm:ps-8 text-sm  border border-gray-900 focus:border-gray-50 hover:border-gray-600 rounded-[24px] bg-[#242424] placeholder:text-[#a7a7a7] placeholder:text-[12px] text-gray-400" >Search song, podcast...</p>
                  </div>
                </button>
              </>
            ) : <span className={`cursor-pointer ${canGoBack ? 'text-white font-bold' : 'text-[#a7a7a7]'}`} onClick={() => {
              navigate(-1);
            }}><i className="bi bi-arrow-left"></i></span>}
          </div>

          {
            props.page === 'search' && <div className="relative group">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 ">
                <svg className="w-4 h-4 text-[#a7a7a7] group-hover:text-gray-50" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <input type="search" className="max-w-[200px] xm:max-w-[400px] shrink block p-3 ps-8 sm:ps-10 text-sm  border border-gray-900 focus:border-gray-50 hover:border-gray-600 rounded-[24px] bg-[#242424] text-gray-50 placeholder:text-[#a7a7a7] placeholder:text-[12px]" placeholder="What do you want to listen..." onChange={(ele) => {
                setUserQuery(ele.target.value)
              }} value={userQuery} autoFocus />
            </div>
          }
        </div>

        <div className="hidden lg:flex items-center gap-5 ">
          <Link to={'/signup'} ><TransparentButton text="Sign Up" /></Link>
          <Link to={'/login'} >
            <WhiteButton text="Log in" py="py-3" />
          </Link>
        </div>
      </div>
    </>
  )
}
