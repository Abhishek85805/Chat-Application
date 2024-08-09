import React from 'react'
import { ChatState } from '../Context/ChatProvider.jsx'
import MyChats from '../components/MyChats.jsx';
import ChatBox from '../components/ChatBox.jsx';
import Header from '../components/Header.jsx';

function Chat() {
  const {token} = ChatState();

  return (
    <div className='h-screen overflow-hidden'>
      {token && <Header/>}
      <div style={{height: 'calc(100% - 70px)'}} className='flex flex-row md:block'>
        {token && <MyChats/>}
        {token && <ChatBox/>}
      </div>
    </div>
  )
}

export default Chat