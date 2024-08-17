import React, { useContext, useEffect, useState } from 'react'
import { faMagnifyingGlass, faBell, faUser, faX} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Sidebar from './Sidebar';
import Profile from './Profile';
import { ChatPageContext } from '../Context/ChatPageContext';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

function Header() {
  const [menuBar, setMenuBar] = useState(false);
  const navigate = useNavigate();

  const chatPage = useContext(ChatPageContext);

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success("User logged out successfully");
    navigate('/');
  }

  return (
    <div className='h-[70px] px-1 pt-1'>  
      <div className='relative h-full flex justify-between items-center bg-white px-[1rem] rounded-lg'>
          <div>
            <div 
            className='bg-[#0BA7BD] p-2 rounded-lg text-white hover:bg-[#73D4E5] transition-all duration-200 ease-linear'
            onClick={()=>chatPage.setSideBar(true)}
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              <button className='ml-2 md:ml-1' disabled={chatPage.profile}>Search</button>
            </div>
            <div className={`${!chatPage.sideBar && 'hidden'}`}>
              <Sidebar/>
              <FontAwesomeIcon 
              icon={faX} 
              className='absolute top-0 left-[300px] md:left-[250px] w-[20px] h-[20px] bg-[#0BA7BD] text-white p-2 hover:bg-[#73D4E5] transition-all duration-200 ease-linear z-10'
              onClick={()=>chatPage.setSideBar(false)}
              />
            </div>
          </div>
          <div className='font-semibold text-2xl md:text-xl'>
            CHAT APP
          </div>
          <div>
            <FontAwesomeIcon icon={faBell} disabled={chatPage.profile} />
            <button 
            className='w-[70px] bg-[#0BA7BD] rounded-lg px-3 py-2 ml-2 hover:bg-[#73D4E5] transition-all duration-200 ease-linear outline-none'
            onClick={()=>setMenuBar(!menuBar)}
            disabled={chatPage.profile}
            >
              <div className='relative w-[30px] h-[30px] rounded-full bg-white flex justify-center items-center'>
                <FontAwesomeIcon icon={faUser} />
              </div>
            </button>
            <div className={`${!menuBar && 'hidden'} absolute top-[72px] right-[1rem] rounded-b-md flex flex-col items-start w-[130px] bg-white`}>
              <button 
              className='hover:bg-[#eff7f8] transition-all duration-200 ease-linear w-full p-2 text-start'
              onClick={()=>chatPage.setProfile(true)}
              disabled={chatPage.profile}
              >
                My Profile
              </button>
              <div 
              className='hover:bg-[#eff7f8] transition-all duration-200 ease-linear w-full p-2 text-start cursor-pointer' 
              disabled={chatPage.profile}
              onClick={handleLogout}
              >
                Logout
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Header