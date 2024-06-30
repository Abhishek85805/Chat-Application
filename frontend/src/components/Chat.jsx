import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Chat() {
  const [user, setUser] = useState({});
  useEffect(()=>{
    async function currentUser(){
      try {
        const token = localStorage.getItem('token')
        const currentUser = await axios.get('http://localhost:3000/api/user/current-user', {
          headers:{
            Authorization: `Bearer ${token}`
          }
        });
        console.log(currentUser.data.data)
        setUser(currentUser.data.data)
      } catch (error) {
        console.log('Something went wrong', error)
      }
    }
    currentUser();
  }, []);

  return (
    <div className='w-full h-full flex flex-row'>
      <div className='w-1/3 h-full bg-lightBlue p-3'>

        <div className='h-28 flex flex-row p-3 shadow-lg rounded-lg bg-white mb-3'>
          <div className='w-20 h-20 shadow-lg rounded-full mr-4'>
          </div>
          <div className='h-full flex-grow flex flex-col justify-evenly'>
            <div className='w-full flex justify-between'>
              <div className='font-semibold'>Abhishek Chauhan</div>
              <div className='text-lightGrey'>2:24PM</div>
            </div>
            <div className='w-full flex justify-between'>
              <div className='text-lightGrey'>Last Message</div>
              <div className='w-8 h-8 rounded-full bg-lightPurple flex justify-center items-center font-semibold text-white'>1</div>
            </div>
          </div>
        </div>

      </div>


      <div className='w-2/3 h-full p-5 flex flex-col'>
        <div className='self-end p-3 bg-lightPurple text-white rounded-l-lg mb-2'>Hello</div>
        <div className='self-end p-3 bg-lightPurple text-white rounded-l-lg mb-2'>Kidda Fer</div>
        <div className='self-start p-3 bg-lightBlue text-black rounded-r-lg mb-2'>Hiii</div>
      </div>
    </div>
  )
}

export default Chat