import React, { useContext } from 'react'
import { ChatState } from '../Context/ChatProvider.jsx'
import MyChats from '../components/MyChats.jsx';
import ChatBox from '../components/ChatBox.jsx';
import Header from '../components/Header.jsx';
import { ChatPageContext } from '../Context/ChatPageContext.jsx';
import Profile from '../components/Profile.jsx';

function Chat() {
  const {token} = ChatState();
  const chatPage = useContext(ChatPageContext);

  return (
    <div className={`h-screen overflow-hidden relative`}>
      <div className={`h-full overflow-hidden ${chatPage.profile && 'opacity-50'}`}>
        {token && <Header/>}
        <div style={{height: 'calc(100% - 70px)'}} className='flex flex-row md:block'>
          {token && <MyChats/>}
          {token && <ChatBox/>}
        </div>`h-full overflow-hidden ${chatPage.profile && 'opacity-50'}`
      </div>
      <Profile/>
    </div>
  )
}

export default Chat