import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ChatPageContext } from '../Context/ChatPageContext'
import React, { useContext } from 'react'
import Friend from './Friend'

function MyChats() {
  const chatPage = useContext(ChatPageContext);
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
          <Friend/>
          <Friend/>
          <Friend/>
          <Friend/>
          <Friend/>
          <Friend/>
          <Friend/>
          <Friend/>
          <Friend/>
          <Friend/>
          <Friend/>
        </div>
      </div>
    </div>
  )
}

export default MyChats