import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [token, setToken] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);

    if (!token) navigate("/");
  }, [navigate]);

  return (
    <ChatContext.Provider
      value={{
        token,
        setToken,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;