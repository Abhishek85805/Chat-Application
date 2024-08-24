import React, { useContext } from 'react'
import { ChatPageContext } from '../Context/ChatPageContext'

function Friend({chat, index}) {
  const chatPage = useContext(ChatPageContext);
  const getFriendName = () => {
    return chatPage.user._id !== chat.users[0]._id ? chat.users[0].name : chat.users[1].name;
  }

  const handleClick = () => {
    chatPage.setBack(true);
    chatPage.setSelectedChat(chat);
  }

  return (
    <div 
    className={`bg-[#E8E8E8] hover:bg-[#d4d4d4] rounded-lg p-[0.6rem] mb-[0.6rem] transition-all duration-200 ease-linear ${chatPage.selectedChat?._id === chat?._id && 'bg-[#d4d4d4]'}`}
    key={index}
    onClick={handleClick}
    >
        <div className='text-[1.3rem]'>{getFriendName()}</div>
        <div className='flex'>
            <div className='font-semibold pr-[0.3rem]'>{chat.latestMessage?.sender.name}:</div>
            <div className='w-[6rem] h-[1.8rem] overflow-hidden'>{chat.latestMessage?.content}</div>
        </div>
    </div>
  )
}

export default Friend