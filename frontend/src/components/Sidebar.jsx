import React from 'react'
import SearchedUser from './SearchedUser'

function Sidebar() {
  return (
    <div className='bg-white w-[300px] py-[0.8rem] px-[1rem] h-screen absolute top-0 left-0'>
      <div className='flex flex-col h-full'>
        <h1 className='text-center font-semibold text-2xl mb-[1rem]'>Search User</h1>
        <div className='flex mb-[1.5rem]'>
          <input type="text" className='w-[200px] outline-none border border-black rounded-md mr-[0.5rem] px-2' />
          <button className='bg-[#0BA7BD] px-3 py-1 rounded-md text-white hover:bg-[#73D4E5] transition-all duration-200 ease-linear outline-none '>Go</button>
        </div>
        <div className='flex-1 h-0 overflow-auto'>
          <SearchedUser/>
          <SearchedUser/>
          <SearchedUser/>
          <SearchedUser/>
          <SearchedUser/>
          <SearchedUser/>
          <SearchedUser/>
          <SearchedUser/>
          <SearchedUser/>
          <SearchedUser/>
          <SearchedUser/>
          <SearchedUser/>
          <SearchedUser/>
          <SearchedUser/>
          <SearchedUser/>
          <SearchedUser/>
          <SearchedUser/>
          <SearchedUser/>
        </div>
      </div>
    </div>
  )
}

export default Sidebar