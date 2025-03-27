
import WhiteButton from './WhiteButton'

export default function BottomCTA({showCtaAlert, handleClose}:{handleClose: any, showCtaAlert: boolean}) {
   
    return (
        <>
            {showCtaAlert && <div className='hidden lg:block bg-gradient-to-r from-[#ae2896] to-[#519af4] fixed w-[calc(100%-12px)] left-[6px] bottom-2 p-2 z-20'>
                <div className='flex gap-2 justify-between items-center'>
                    <div className='text-[12px] font-medium'>
                        <p>Preview of smoothie</p>
                        <p className='line-clamp-2'>Signup to get unlimited songs and podcast with occasional ads. No credit card required.</p>
                    </div>
                    <div className='shrink-0 flex items-center gap-x-2'>
                        <WhiteButton text="Signup for free" />
                        <button className='text-lg md:text-xl font-semibold whitespace-nowrap cursor-pointer' onClick={handleClose}><i className="bi bi-x-circle-fill"></i></button>
                    </div>
                </div>
            </div>}
        </>
    )
}
