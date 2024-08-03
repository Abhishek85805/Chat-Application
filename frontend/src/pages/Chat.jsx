import React from 'react'
import { ChatState } from '../Context/ChatProvider.jsx'
import MyChats from '../components/MyChats.jsx';
import ChatBox from '../components/ChatBox.jsx';
import Header from '../components/Header.jsx';

function Chat() {
  const {token} = ChatState();

  return (
    <div>
      {token && <Header/>}
      <div>
        {token && <MyChats/>}
        {token && <ChatBox/>}
      </div>
    </div>
  )
}

export default Chat