import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ChatPageContext } from '../Context/ChatPageContext'
import React, { useContext, useEffect } from 'react'
import Friend from './Friend'
import axios from 'axios'
import { toast } from 'sonner'

function MyChats() {
  const chatPage = useContext(ChatPageContext);

  const fetchFriends = async() => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:3000/api/chat', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      chatPage.setChats(res.data);

    } catch (error) {
      toast.error('Something went wrong');
      console.log('something went wrong', error);
    }
  }

  useEffect(()=>{
    fetchFriends();
  }, [])

  return (
    <div className={`h-full py-1 pl-1 flex-[0.38] ${chatPage.back && 'md:hidden'}`}>
      <div className='h-full bg-white rounded-lg flex flex-col p-[0.4rem]'>
        <div className='flex flex-row justify-between mb-[0.3rem]'>
          <h1 className='text-[1.2rem]'>My Chats</h1>
          <button className='flex flex-row justify-between items-center w-[8rem] bg-[#0BA7BD] rounded-lg px-3 py-2 ml-2 hover:bg-[#73D4E5] transition-all duration-200 ease-linear outline-none text-white'>
            <span>Group Chat</span>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        <div className='flex-1 h-0 overflow-auto rounded-lg bg-[#f2f6f9] p-[0.6rem] scrollbar-thin'>
          {
            chatPage.chats.map((chat, index) => <Friend chat = {chat} index={index} key={index}/>)
          }
        </div>
      </div>
    </div>
  )
}

export default MyChats