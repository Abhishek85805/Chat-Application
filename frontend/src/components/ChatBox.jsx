import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ChatPageContext } from '../Context/ChatPageContext'
import React, {useContext} from 'react'
import Message from './Message'

function ChatBox() {
  const chatPage = useContext(ChatPageContext);
  return (
    <div className='h-full p-1 flex-[0.62]'>
      <div className='h-full w-full bg-white rounded-lg flex flex-col p-[0.4rem]'>
        <div className='flex justify-between p-[1rem]'>
          <div 
          className='text-[1.4rem] cursor-pointer hidden md:block'
          onClick={()=>chatPage.setBack(false)}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </div>
          <p className='text-[1.3rem]'>Roadside Coder</p>
        </div>
        <div className='flex-1 h-0 rounded-lg bg-[#f2f6f9] p-[0.6rem] flex flex-col'>
          <div className='flex-1 h-0 mb-[0.5rem] overflow-auto flex flex-col scrollbar-thin'>
            <Message/>
            <Message/>
            <Message/>
            <Message/>
          </div>
          <input 
          className='bg-[#d7dbdb] outline-none p-[0.4rem] rounded-lg' 
          type="text" 
          placeholder='Enter a Message'
          />
        </div>
      </div>
    </div>
  )
}

export default ChatBox