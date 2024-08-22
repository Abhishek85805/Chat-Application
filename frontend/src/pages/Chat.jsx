import React, { useContext, useEffect } from 'react'
import MyChats from '../components/MyChats.jsx';
import ChatBox from '../components/ChatBox.jsx';
import Header from '../components/Header.jsx';
import { ChatPageContext } from '../Context/ChatPageContext.jsx';
import Profile from '../components/Profile.jsx';
import axios from 'axios';

function Chat() {
  const token = localStorage.getItem('token');
  const chatPage = useContext(ChatPageContext);
  
  useEffect(()=>{
    ;(async()=>{
      const res = await axios.get('http://localhost:3000/api/user/current-user', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      chatPage.setUser(res.data);
    })()
  }, []);

  return (
    <div className={`h-screen overflow-hidden relative`}>
      <div className={`h-full overflow-hidden ${chatPage.profile && 'opacity-50'}`}>
        {token && <Header/>}
        <div style={{height: 'calc(100% - 70px)'}} className='flex flex-row md:block'>
          {token && <MyChats/>}
          {token && <ChatBox/>}
        </div>
      </div>
      <Profile/>
    </div>
  )
}

export default Chat