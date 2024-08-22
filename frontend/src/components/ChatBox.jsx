import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ChatPageContext } from '../Context/ChatPageContext'
import React, {useContext, useEffect, useState, useRef} from 'react'
import Message from './Message'
import axios from 'axios'
import { toast } from 'sonner'

function ChatBox() {
  const token = localStorage.getItem('token');
  const chatPage = useContext(ChatPageContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const sendMessages = async(e) => {
    if(e.key === "Enter" && newMessage){
      try {
        setNewMessage("");
        const res = await axios.post('http://localhost:3000/api/message', {
          content: newMessage,
          chatId: chatPage.selectedChat._id
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setMessages([...messages, res.data]);
      } catch (error) {
        toast.error("Something went wrong!!");
        console.log(error);
      }
    }
  }

  const fetchMessages = async(friend_id) => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:3000/api/message/${friend_id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setLoading(false);
      setMessages(res.data);
    } catch (error) {
      toast.error("Coudn't fetch the messages");
      console.log("Something went wrong while fetching messages", error);
    }
  }

  useEffect(()=>{
    if(chatPage.selectedChat)
      fetchMessages(chatPage.selectedChat._id);
  }, [chatPage.selectedChat])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [messages]);
  
  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    //Typing Indicator logic
  }

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
          <p className='text-[1.3rem]'>{chatPage.selectedChat?.users[0].name === chatPage.user?.name ? chatPage.selectedChat?.users[1].name : chatPage.selectedChat?.users[0].name}</p>
        </div>
        <div className='flex-1 h-0 rounded-lg bg-[#f2f6f9] p-[0.6rem] flex flex-col'>
          <div className='flex-1 h-0 mb-[0.5rem] overflow-auto flex flex-col scrollbar-thin'>
            {
              !loading ? messages.map((message, index)=> <Message message={message} key={index} index={index}/>) : 'Loading....'
            }
            <div ref={messagesEndRef} />
          </div>
          <input 
          className='bg-[#d7dbdb] outline-none p-[0.4rem] rounded-lg' 
          type="text" 
          placeholder='Enter a Message'
          value={newMessage}
          onKeyDown={sendMessages}
          onChange={typingHandler}
          />
        </div>
      </div>
    </div>
  )
}

export default ChatBox