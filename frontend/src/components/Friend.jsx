import React, { useContext } from 'react'
import { ChatPageContext } from '../Context/ChatPageContext'

function Friend({chat, index}) {
  const chatPage = useContext(ChatPageContext);
  const getFriendName = () => {
    return chatPage.user._id !== chat.users[0]._id ? chat.users[0].name : chat.users[1].name;
  }
  return (
    <div 
    className='bg-[#E8E8E8] hover:bg-[#d4d4d4] rounded-lg p-[0.6rem] mb-[0.6rem] transition-all duration-200 ease-linear'
    key={index}
    onClick={()=> chatPage.setBack(true)}
    >
        <div className='text-[1.3rem]'>{getFriendName()}</div>
        <div className='flex'>
            <div className='font-semibold pr-[0.3rem]'>Name:</div>
            <div>hello</div>
        </div>
    </div>
  )
}

export default Friend