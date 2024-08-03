import React, { useState } from 'react'
import { faMagnifyingGlass, faBell, faUser, faX} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Sidebar from './Sidebar';

function Header() {
  const [menuBar, setMenuBar] = useState(false);
  const [sideBar, setSideBar] = useState(false);

  return (
    <div className='relative h-[70px] flex justify-between items-center bg-white px-[1rem]'>
        <div>
          <div 
          className='bg-[#0BA7BD] p-2 rounded-lg text-white hover:bg-[#73D4E5] transition-all duration-200 ease-linear'
          onClick={()=>setSideBar(true)}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <button className='ml-2'>Search User</button>
          </div>
          <div className={`${!sideBar && 'hidden'}`}>
            <Sidebar/>
            <FontAwesomeIcon 
            icon={faX} 
            className='absolute top-0 left-[300px] w-[20px] h-[20px] bg-[#0BA7BD] text-white p-2 hover:bg-[#73D4E5] transition-all duration-200 ease-linear'
            onClick={()=>setSideBar(false)}
            />
          </div>
        </div>
        <div className='font-semibold text-2xl'>
          CHAT APP
        </div>
        <div>
          <FontAwesomeIcon icon={faBell} />
          <button 
          className='w-[70px] bg-[#0BA7BD] rounded-lg px-3 py-2 ml-2 hover:bg-[#73D4E5] transition-all duration-200 ease-linear outline-none'
          onClick={()=>setMenuBar(!menuBar)}
          >
            <div className='relative w-[30px] h-[30px] rounded-full bg-white flex justify-center items-center'>
              <FontAwesomeIcon icon={faUser} />
            </div>
            <div className={`${!menuBar && 'hidden'} absolute top-[70px] right-[1rem] rounded-b-md flex flex-col items-start w-[130px] bg-white`}>
              <div className='hover:bg-[#eff7f8] transition-all duration-200 ease-linear w-full p-2 text-start'>My Profile</div>
              <div className='hover:bg-[#eff7f8] transition-all duration-200 ease-linear w-full p-2 text-start'>Logout</div>
            </div>
          </button>
        </div>
    </div>
  )
}

export default Header