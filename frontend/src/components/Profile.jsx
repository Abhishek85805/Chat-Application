import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

function Profile() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:3000/api/user/current-user', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(res.data.data);
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className='h-full flex justify-center items-center bg-white'>
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
        </div>
      ) : (
        <div className='font-bold text-2xl text-black'>
          Loading...
        </div>
      )}
    </div>
  );
}

export default Profile;
