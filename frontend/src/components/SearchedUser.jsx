import React from 'react'

function SearchedUser({user, index}) {
  return (
    <div key={index} className='flex items-center bg-[#eff7f8] p-[0.5rem] rounded-md mb-[0.4rem] hover:bg-[#BCEBEF] transition-all duration-200 ease-linear'>
        <div className='w-[35px] h-[35px] rounded-full border border-black mr-[10px]'>
        </div>
        <div>
            <div>{user.name}</div>
            <div><span className='font-bold'>Email:</span><span>{user.email}</span></div>
        </div>
    </div>
  )
}

export default SearchedUser