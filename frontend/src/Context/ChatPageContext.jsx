import { createContext, useState } from "react";

export const ChatPageContext = createContext();

export const ChatPageProvider = (props) => {
    const [back, setBack] = useState(false);
    const [profile, setProfile] = useState(false);
    return (
        <ChatPageContext.Provider
        value={{
            back, 
            setBack, 
            profile,
            setProfile
        }}>
            {props.children}
        </ChatPageContext.Provider>
    )
}