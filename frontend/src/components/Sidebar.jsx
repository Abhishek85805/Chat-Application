import React, { useEffect, useState } from 'react'
import SearchedUser from './SearchedUser'
import axios from 'axios';
import {toast} from 'sonner';

function Sidebar() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  useEffect(()=>{
    const controller = new AbortController();
    ;(async()=>{
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('https://chat-application-fmoj.onrender.com/api/user?search='+search, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          signal: controller.signal
        })
        setData(res.data);
      } catch (error) {
        if(axios.isCancel(error)){
          return;
        }
        toast.error('Something went wrong');
        console.log(error);
      }
    })();

    return () => {
      controller.abort();
    }
    
  }, [search])

  return (
    <div className='bg-white w-[300px] md:w-[250px] py-[0.8rem] px-[1rem] h-screen absolute top-0 left-0 z-10'>
      <div className='flex flex-col h-full'>
        <h1 className='text-center font-semibold text-2xl mb-[1rem]'>Search User</h1>
        <div className='flex mb-[1.5rem]'>
          <input type="text" className='w-[200px] md:w-[170px] outline-none border border-black rounded-md mr-[0.5rem] px-2' value={search} onChange={(e) => setSearch(e.target.value)} />
          <button 
          className='bg-[#0BA7BD] px-3 py-1 rounded-md text-white hover:bg-[#73D4E5] transition-all duration-200 ease-linear outline-none '
          >Go</button>
        </div>
        <div className='flex-1 h-0 overflow-auto'>
          {
            data.map((user, index) => <SearchedUser user={user} index={index} key={index}/>)
          }
        </div>
      </div>
    </div>
  )
}

export default Sidebar