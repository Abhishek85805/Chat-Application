import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ChatPageContext } from '../Context/ChatPageContext'
import React, {useContext, useEffect, useState, useRef} from 'react'
import Message from './Message'
import axios from 'axios'
import { toast } from 'sonner'
import io from 'socket.io-client';

const ENDPOINT = "https://chat-application-fmoj.onrender.com";
var socket, selectedChatCompare;

function ChatBox() {
  const token = localStorage.getItem('token');
  const chatPage = useContext(ChatPageContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);

  const messagesEndRef = useRef(null);
  const sendMessages = async(e) => {
    if(e.key === "Enter" && newMessage){
      try {
        setNewMessage("");
        const res = await axios.post('https://chat-application-fmoj.onrender.com/api/message', {
          content: newMessage,
          chatId: chatPage.selectedChat._id
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        socket.emit('new message', res.data);
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
      const res = await axios.get(`https://chat-application-fmoj.onrender.com/api/message/${friend_id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setMessages(res.data);
      setLoading(false);

      socket.emit('join chat', chatPage.selectedChat._id); 
    } catch (error) {
      toast.error("Coudn't fetch the messages");
      console.log("Something went wrong while fetching messages", error);
    }
  }

  useEffect(()=>{
    if(chatPage.selectedChat){
      fetchMessages(chatPage.selectedChat._id);
      selectedChatCompare = chatPage.selectedChat;
    }
  }, [chatPage.selectedChat])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [messages]);

  useEffect(()=>{
    socket = io(ENDPOINT);
    socket.emit("setup", chatPage.user)
    socket.on('connect', () => setSocketConnected(true));
  }, [])

  useEffect(()=>{
    socket.on('message recieved', (newMessageRecieved) => {
      if(!selectedChatCompare || selectedChatCompare._id != newMessageRecieved.chat._id){
        //Give notification
      }else{
        setMessages([...messages, newMessageRecieved]);
      }
    })
  })
  
  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    //Typing Indicator logic
  }

  return (
    <div className={`h-full p-1 flex-[0.62] ${chatPage.back ? 'md:block' : 'md:hidden'}`}>
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
          <div className='flex-1 mb-[0.5rem] overflow-y-auto flex flex-col scrollbar-thin'>
            {
              !loading ? messages.map((message, index)=> <Message message={message} key={index} index={index}/>) : 'Loading....'
            }
            <div ref={messagesEndRef} />
          </div>
          <input 
          className={`bg-[#d7dbdb] outline-none p-[0.4rem] rounded-lg ${!chatPage.selectedChat && 'hidden'}`} 
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