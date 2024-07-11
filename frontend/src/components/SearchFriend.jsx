import React, { useState } from 'react';
import axios from 'axios';
import {toast} from 'sonner'

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
      toast.error(error.response.data.message)
      console.log(error);
    }
  }

  const handleFriendRequest = async(e) => {
    e.preventDefault();
    if(!isFriend){
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
        toast.error(error.response.data.message)
        console.log(error);
      }
    }else{
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
        toast.error(error.response.data.message)
        console.log(error);
      }
    }
  }

  return (
    <div className='h-full flex flex-col items-center bg-white'>
      <div className='h-32 w-full border-b border-gray-300 flex justify-center items-center bg-white'>
        <form onSubmit={handleSubmit} className='flex'>
          <input
            name='search'
            type='text'
            placeholder='Search For a Friend'
            onChange={(e) => setSearch(e.target.value)}
            className='p-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-lightPurple'
          />
          <button
            type='submit'
            className='bg-lightPurple text-white p-2 rounded-r-lg border border-lightPurple hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-lightPurple'
          >
            Submit
          </button>
        </form>
      </div>
    
      <div className='flex-grow w-full flex justify-center items-center'>
        {user? (
          <div className='border border-black rounded-xl w-72 h-72 flex flex-col'>
            <div className='flex justify-center items-center p-4'>
              <img src={user.avatar} alt="img" className='w-20 h-20 rounded-full mr-4 border border-black' />
            </div>
            <hr/>
            <div>
              <div className='font-semibold p-2 flex justify-center items-center'>{user.username}</div>
              <div className='text-gray-500 p-2 flex justify-center items-center'>{user.email}</div>
            </div>
            <hr/>
            <div className="flex justify-center items-center flex-grow">
              
              <button 
              className="border border-black w-32 p-3 rounded-md"
              onClick={handleFriendRequest}
              >
                {isFriend?"Unfriend":"Add Friend"}
              </button>
            </div>
          </div>
        ): (
          <div className='font-bold text-2xl text-black'>
            Seacrch for a user
          </div>
        )}
      </div>
      
    </div>
  );
}

export default SearchFriend;
