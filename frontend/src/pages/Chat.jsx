import React, { useContext, useEffect, useState } from 'react'
import MyChats from '../components/MyChats.jsx';
import ChatBox from '../components/ChatBox.jsx';
import Header from '../components/Header.jsx';
import { ChatPageContext } from '../Context/ChatPageContext.jsx';
import Profile from '../components/Profile.jsx';
import axios from 'axios';

function Chat() {
  const token = localStorage.getItem('token');
  const chatPage = useContext(ChatPageContext);
  const [loading, setLoading] = useState(false);
  
  useEffect(()=>{
    ;(async()=>{
      setLoading(true);
      const res = await axios.get('http://localhost:3000/api/user/current-user', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      chatPage.setUser(res.data);
      setLoading(false);
    })()
  }, []);

  return (
    <div className={`h-screen overflow-hidden relative`}>
      {!loading ? (
        <div className={`h-full overflow-hidden ${chatPage.profile ? 'opacity-50' : ''}`}>
          {token && <Header />}
          <div style={{ height: 'calc(100% - 70px)' }} className='flex flex-row md:block'>
            {token && <MyChats />}
            {token && <ChatBox />}
          </div>
        </div>
      ) : (
        <div>
          loading...
        </div>
      )}
      <Profile />
    </div>
  );
  
}

export default Chat