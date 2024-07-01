import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Chat() {
  const [user, setUser] = useState({});
  const [messages, setMessages] = useState([]);
  const [friend, setFriend] = useState('');
  const [newMessage, setNewMessage] = useState('');

  useEffect(()=>{
    async function currentUser(){
      try {
        const token = localStorage.getItem('token')
        const currentUser = await axios.get('http://localhost:3000/api/user/all-friends', {
          headers:{
            Authorization: `Bearer ${token}`
          }
        });
        setUser(currentUser.data.data[0])
      } catch (error) {
        console.log('Something went wrong', error)
      }
    }
    currentUser();
  }, []);

  const handleMessages = async(to) => {
    
    const token = localStorage.getItem('token')
    const res = await axios.post('http://localhost:3000/api/message/get-messages', {to}, {
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    setFriend(to);
    setMessages(res.data.data);
  }

  const handleSendMessage = async () => {
    if (!newMessage) return;

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:3000/api/message/add-message', { message: newMessage, to: friend }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMessages([...messages, { message: newMessage, fromSelf: true }]);
      setNewMessage('');
    } catch (error) {
      console.log('Something went wrong', error);
    }
  };

  return (
    <div className='w-full h-full flex flex-row'>
      <div className='w-1/3 h-full bg-lightBlue p-3'>

        {user.friendsInfo ? (
          user.friendsInfo.map(friend => {
            return (
              <div key={friend._id} className='h-28 flex flex-row p-3 shadow-lg rounded-lg bg-white mb-3' onClick={()=>handleMessages(friend._id)}>
                <div className='w-20 h-20 shadow-lg rounded-full mr-4'>
                  <img src={friend.avatar} alt={friend.username} className='w-full h-full rounded-full' />
                </div>
                <div className='h-full flex-grow flex flex-col justify-evenly'>
                  <div className='w-full flex justify-between'>
                    <div className='font-semibold'>{friend.username}</div>
                    <div className='text-lightGrey'>2:24PM</div>
                  </div>
                  <div className='w-full flex justify-between'>
                    <div className='text-lightGrey'>Last Message</div>
                    <div className='w-8 h-8 rounded-full bg-lightPurple flex justify-center items-center font-semibold text-white'>1</div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div>Loading friends...</div>
        )}

      </div>

      
      <div className='w-2/3 h-full p-5 flex flex-col justify-between'>
        <div className='flex-grow overflow-y-auto'>
          {messages.length > 0 ? (
            messages.map((message, index) => (
              <div key={index} className={`p-3 mb-2 rounded-lg ${message.fromSelf===true ? 'self-end bg-lightPurple text-white rounded-l-lg' : 'self-start bg-lightBlue text-black rounded-r-lg'}`}>
                {message.message}
              </div>
            ))
          ) : (
            <div>No Messages</div>
          )}
        </div>
        <div className='mt-4 flex items-center'>
          <input
            type="text"
            placeholder='Write Your Message'
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className='flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-lightPurple'
          />
          <button
            onClick={handleSendMessage}
            className='p-2 bg-lightPurple text-white rounded-r-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-lightPurple'
          >
            Send
          </button>
        </div>
      </div>

    </div>
  )
}

export default Chat