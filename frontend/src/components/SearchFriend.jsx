import React, { useState } from 'react';
import axios from 'axios';
import {toast} from 'sonner'

function SearchFriend() {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:3000/api/user/search-user', { username: search }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUser(res.data.data);
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error);
    }
  }

  return (
    <div className='h-screen flex flex-col items-center bg-gray-100'>
      <div className='h-32 w-full border-b border-gray-300 flex justify-center items-center bg-white shadow-md'>
        <form onSubmit={handleSubmit} className='flex'>
          <input
            name='search'
            type='text'
            placeholder='Search For a Friend'
            onChange={(e) => setSearch(e.target.value)}
            className='bg-lightBlue p-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-lightPurple'
          />
          <button
            type='submit'
            className='bg-lightPurple text-white p-2 rounded-r-lg border border-lightPurple hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-lightPurple'
          >
            Submit
          </button>
        </form>
      </div>
      <div className='mt-4 p-4 w-full max-w-md bg-white shadow-md rounded-lg'>
        {user ? (
          <div className='flex items-center'>
            <img src={user.avatar} alt={user.username} className='w-16 h-16 rounded-full mr-4' />
            <div>
              <div className='font-semibold'>{user.username}</div>
              <div className='text-gray-500'>{user.email}</div>
            </div>
          </div>
        ) : (
          <div className='text-center text-gray-500'>Search For A Friend</div>
        )}
      </div>
    </div>
  );
}

export default SearchFriend;
