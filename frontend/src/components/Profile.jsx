import React from 'react'
import { faX} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Profile({openProfile, closeProfile}) {
  return (
    <div className={`fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ${!openProfile && 'hidden'} bg-white px-[1.2rem] pb-[1.2rem] pt-[0.4rem] w-[300px] rounded-lg md:w-[240px]`}>
        <div className='text-right'>
          <FontAwesomeIcon icon={faX} onClick={closeProfile} className='hover:text-[#332d2d] text-[20px]'/>
        </div>
        <h1 className='font-semibold text-2xl text-center mb-[20px]'>Name</h1>
        <div className='flex justify-center items-center'>
          <div className='border border-black w-[100px] h-[100px] rounded-full'>

          </div>
        </div>
        <div className='text-2xl mb-[20px]'>
          <p>Email:</p>
          <p>email@gmail.com</p>
        </div>
        <div className='text-right'>
          <button 
          className='bg-[#0BA7BD] px-3 py-1 rounded-md text-white hover:bg-[#73D4E5] transition-all duration-200 ease-linear outline-none'
          onClick={closeProfile}
          >
            Close
          </button>
        </div>
    </div>
  )
}

export default Profile