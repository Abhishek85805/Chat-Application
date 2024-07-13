import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

function SearchFriend() {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);
  const [isFriend, setIsFriend] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:3000/api/user/search-user', { username: search }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setIsFriend(res.data.isFriend);
      setUser(res.data.data);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  }

  const handleFriendRequest = async (e) => {
    e.preventDefault();
    if (!isFriend) {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.post('http://localhost:3000/api/user/request', { recipientId: user._id }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        toast.success(res.data.message);
        console.log(res);
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      }
    } else {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.post('http://localhost:3000/api/user/un-friend', { friendId: user._id }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        toast.success(res.data.message);
        setIsFriend(false);
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      }
    }
  }

  return (
    <div className='h-full flex flex-col items-center bg-white'>
      <div className='h-32 w-full border-b border-gray-300 flex justify-center items-center bg-white'>
        <form onSubmit={handleSubmit} className='flex shadow-md'>
          <input
            name='search'
            type='text'
            placeholder='Search For a Friend'
            onChange={(e) => setSearch(e.target.value)}
            className='p-2 rounded-l-lg border border-gray-300 focus:outline-none'
          />
          <button
            type='submit'
            className='bg-black text-white p-2 rounded-r-lg border border-black hover:bg-gray-800 focus:outline-none'
          >
            Search
          </button>
        </form>
      </div>
    
      <div className='flex-grow w-full flex justify-center items-center'>
        {user ? (
          <div className='border border-gray-300 rounded-xl w-80 h-auto flex flex-col shadow-lg p-6 bg-white'>
            <div className='flex flex-col items-center mb-4'>
              <img src={user.avatar} alt="img" className='w-24 h-24 rounded-full mb-4 border border-gray-300' />
              <div className='text-center'>
                <div className='font-semibold text-black text-xl'>{user.username}</div>
                <div className='text-gray-500'>{user.email}</div>
              </div>
            </div>
            <hr className='border-gray-300 mb-4' />
            <div className="flex justify-center items-center">
              <button 
                className="border border-gray-300 bg-black text-white w-32 p-3 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
                onClick={handleFriendRequest}
              >
                {isFriend ? "Unfriend" : "Add Friend"}
              </button>
            </div>
          </div>
        ) : (
          <div className='text-xl text-black'>
            Search for a user
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchFriend;
