import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import {toast} from 'sonner';

function FriendRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(()=>{
    const fetchReqeusts = async() =>{
      try {
        const token = localStorage.getItem('token')
        const res = await axios.get('http://localhost:3000/api/user/friend-requests', {
          headers:{
            Authorization: `Bearer ${token}`
          }
        });
        console.log(res.data.data);
        setRequests(res.data.data);
      } catch (error) {
        console.log("Something went wrong", error);
      }
    }
    fetchReqeusts();
  }, [])

  const handleAccept = async(requesterId) => {
    try {
      const token = localStorage.getItem('token')
      const res = await axios.post('http://localhost:3000/api/user/request-accepted', {requesterId}, {
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
      toast.success(res.data.message);
      setRequests(prevRequests => prevRequests.filter(request => request._id !== requesterId));
      
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

  const handleReject = async(requesterId) => {
    try {
      const token = localStorage.getItem('token')
      const res = await axios.post('http://localhost:3000/api/user/request-rejected', {requesterId}, {
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
      toast.success(res.data.message);
      setRequests(prevRequests => prevRequests.filter(request => request._id !== requesterId));
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

  return (
    <div className="h-full bg-white p-5 overflow-y-auto">
      {requests.length>0 ? (
        requests.map(request => (
          <div key={request._id} className="flex h-20 flex-row items-center border border-gray-200 p-2 pl-4 pr-4 rounded-lg shadow-md mb-4">
            <div className="h-16 w-16 rounded-full border border-gray-300 overflow-hidden">
              <img src={request.avatar} alt="" />
            </div>
            <div className="ml-5">
              <div className="text-black">{request.username}</div>
              <div className="text-black">{request.email}</div>
            </div>
            <div className="flex-grow flex flex-row justify-end gap-4">
              <button className="text-black" onClick={()=>handleAccept(request._id)}><FontAwesomeIcon icon={faCheck} size='xl' color='green'/></button>
              <button className="text-black" onClick={()=>handleReject(request._id)}><FontAwesomeIcon icon={faTimes} size='xl' color='red'/></button>
            </div>
          </div>
        )
      )): (
        <div className="flex items-center justify-center h-full">
          <div className="text-xl text-black bg-white p-10 rounded-lg shadow-md">No friend requests</div>
        </div>
      )}
    </div>
  )
}

export default FriendRequests