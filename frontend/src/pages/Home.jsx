import React, { useEffect, useState } from 'react'
import Login from '../components/Login'
import Register from '../components/Register';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [login, setLogin] = useState(true);
  const navigate = useNavigate();

  useEffect(()=>{
    const token = localStorage.getItem("token")

    if(token) navigate('/chat')
  }, [navigate])

  return (
    <div className='min-h-full flex justify-center items-center md:flex-col md:justify-end'>
        {login ? <Login setLogin={setLogin}/> : <Register setLogin={setLogin}/>}
    </div>
  )
}

export default Home