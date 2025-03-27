export default function CategoryCard(props: any) {
    const darkColors = [
        'bg-[#8400e7]',
        'bg-[#e13300]',
        'bg-[#00432c]',
        'bg-[#a56752]',
        'bg-[#8e66ac]',
        'bg-[#b02897]',
        'bg-[#dc148c]',
        'bg-[#1e3264]',
        'bg-[#777777]',
        'bg-[#1e3264]',
    ];

   
   // Select the color at the random index
   const randomColor = darkColors[(props.index)%darkColors.length];
    return (
        <>
            <div className={`top-0 block min-w-[150px] w-full xm:min-w-[50%] xm:w-[50%] sm:min-w-[33%] sm:w-[33%] md:min-w-[20%] md:w-[20%] p-2`}>
                <div className={`relative overflow-hidden cursor-pointer max-w-full h-[150px] p-3 ${randomColor} text-gray-50 rounded-md `}>

                    <h6 className="font-semibold text-lg line-clamp-2">{props.image.title}</h6>
                    <img className='absolute bottom-[-20px] right-[-20px] w-[100px] rotate-45 rounded-md' src={props.image.thumbnail} alt="song_thumbnail" />


                </div>
            </div>
        </>
    )
}
