import { createContext, useState } from "react";
import Sidebar from "../components/Sidebar";

export const ChatPageContext = createContext();

export const ChatPageProvider = (props) => {
    const [back, setBack] = useState(false);
    const [profile, setProfile] = useState(false);
    const [selectedChat, setSelectedChat] = useState();
    const [chats, setChats] = useState([]);
    const [sideBar, setSideBar] = useState(false);
    return (
        <ChatPageContext.Provider
        value={{
            back, 
            setBack, 
            profile,
            setProfile,
            sideBar,
            setSideBar,
            selectedChat, 
            setSelectedChat,
            chats,
            setChats
        }}>
            {props.children}
        </ChatPageContext.Provider>
    )
}