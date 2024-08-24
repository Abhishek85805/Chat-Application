import axios from 'axios';
import React, { useContext } from 'react'
import { toast } from 'sonner';
import { ChatPageContext } from '../Context/ChatPageContext';

function SearchedUser({user, index}) {
  const chatPage = useContext(ChatPageContext);
  const handleChat = async() => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('https://chat-application-fmoj.onrender.com/api/chat', {userId: user._id}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      chatPage.setSideBar(false);
      chatPage.setSelectedChat(res.data)
    } catch (error) {
      toast.error("Something went wrong")
      console.log("Something went wrong while creating chat");
    }
  }

  return (
    <div 
    key={index} 
    className='flex items-center bg-[#eff7f8] p-[0.5rem] rounded-md mb-[0.4rem] hover:bg-[#BCEBEF] transition-all duration-200 ease-linear cursor-pointer'
    onClick={handleChat}
    >
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