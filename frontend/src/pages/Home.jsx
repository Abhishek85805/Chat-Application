import React, { useState } from 'react'
import Login from '../components/Login'
import Register from '../components/Register';

function Home() {
  const [login, setLogin] = useState(true);
  return (
    <div className='min-h-full bg-home-page bg-cover bg-center bg-no-repeat bg-fixed flex justify-center items-center md:flex-col md:justify-end'>
        {login ? <Login setLogin={setLogin}/> : <Register setLogin={setLogin}/>}
    </div>
  )
}

export default Home