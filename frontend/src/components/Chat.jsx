import axios from 'axios';
import React, { useEffect, useState } from 'react';
import UserComponent from './User/UserComponent';

function Chat() {
  const [user, setUser] = useState({});
  const [messages, setMessages] = useState([]);
  const [friend, setFriend] = useState('');
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    async function currentUser() {
      try {
        const token = localStorage.getItem('token');
        const currentUser = await axios.get('http://localhost:3000/api/user/all-friends', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(currentUser.data.data[0]);
      } catch (error) {
        console.log('Something went wrong', error);
      }
    }
    currentUser();
  }, []);

  const handleMessages = async (to) => {
    const token = localStorage.getItem('token');
    const res = await axios.post('http://localhost:3000/api/message/get-messages', { to }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setFriend(to);
    setMessages(res.data.data);
  };

  const handleSendMessage = async () => {
    if (!newMessage) return;

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3000/api/message/add-message', { message: newMessage, to: friend }, {
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
      <div className='w-1/3 h-full bg-white p-3 shadow-md'>
        {user.friendsInfo ? (
          user.friendsInfo.length > 0 ? (
            user.friendsInfo.map(friend => (
              <div
                key={friend._id}
                className='h-28 flex flex-row p-3 rounded-lg bg-white border border-gray-200 mb-3 shadow-md cursor-pointer'
                onClick={() => handleMessages(friend._id)}
              >
                <UserComponent friend={friend} />
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-xl text-black bg-white p-10 rounded-lg shadow-md">You don't have any friends</div>
            </div>
          )
        ) : (
          <div>Loading friends...</div>
        )}
      </div>

      <div className='w-2/3 h-full p-5 flex flex-col justify-between'>
        <div className='flex-grow h-0 overflow-y-auto flex flex-col'>
          {messages.length > 0 ? (
            messages.map((message, index) => (
              <div key={index} className={`p-3 mb-2 rounded-lg ${message.fromSelf ? 'self-end bg-gray-800 text-white rounded-l-lg' : 'self-start bg-gray-200 text-black rounded-r-lg'}`}>
                {message.message}
              </div>
            ))
          ) : (
            <div className='flex-grow flex justify-center items-center'>No Messages</div>
          )}
        </div>
        {friend && (
          <div className='mt-4 flex items-center'>
            <input
              type="text"
              placeholder='Write Your Message'
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className='flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none'
            />
            <button
              onClick={handleSendMessage}

              className='p-2 bg-gray-800 text-white rounded-r-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-800'
            >
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chat;
