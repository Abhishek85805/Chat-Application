import React from 'react'
import { ChatState } from '../Context/ChatProvider.jsx'
import Sidebar from '../components/Sidebar.jsx';

function Chat() {
  const {token} = ChatState();

  return (
    <div>
      {token && <Sidebar/>}
    </div>
  )
}

export default Chat