export default function TransparentButton(props: any) {
    return (
     
      <>
      
      {/* this button will always display in one line andd trimmed the over flow text */}
      <button type="button" className={`max-w-full text-[12px] font-semibold text-[#a7a7a7] transition-all  hover:text-gray-50 focus:text-gray-50 rounded-[24px] truncate`} onClick={()=>{props.onClick()}}>{props.text}</button>
      </>
    )
  }
  TransparentButton.defaultProps={
      py: 'py-3'
  }