import React, { useContext } from 'react'
import { ChatPageContext } from '../Context/ChatPageContext'

function Message({message, index}) {
  const chatPage = useContext(ChatPageContext);
  return (
    <div 
    key={index} 
    className={`max-w-[20rem] ${chatPage.user._id !== message.sender._id ? 'self-start bg-[#d4d4d4]' : 'self-end bg-[#a5f1c5]'} p-[0.4rem] rounded-lg mb-[0.3rem] break-words`}>
        {message.content}
    </div>
  )
}

export default Message