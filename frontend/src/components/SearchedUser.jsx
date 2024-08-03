import React from 'react'

function SearchedUser() {
  return (
    <div className='flex items-center bg-[#eff7f8] p-[0.5rem] rounded-md mb-[0.4rem] hover:bg-[#BCEBEF] transition-all duration-200 ease-linear'>
        <div className='w-[35px] h-[35px] rounded-full border border-black mr-[10px]'>
        </div>
        <div>
            <div>John Doe</div>
            <div><span className='font-bold'>Email:</span><span>jon@example.com</span></div>
        </div>
    </div>
  )
}

export default SearchedUser