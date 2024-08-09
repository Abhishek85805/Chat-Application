import React, { useContext } from 'react'
import { ChatPageContext } from '../Context/ChatPageContext'

function Friend() {
  const chatPage = useContext(ChatPageContext);
  return (
    <div 
    className='bg-[#E8E8E8] hover:bg-[#d4d4d4] rounded-lg p-[0.6rem] mb-[0.6rem] transition-all duration-200 ease-linear'
    onClick={()=> chatPage.setBack(true)}
    >
        <div className='text-[1.3rem]'>Name</div>
        <div className='flex'>
            <div className='font-semibold pr-[0.3rem]'>Name:</div>
            <div>hello</div>
        </div>
    </div>
  )
}

export default Friend