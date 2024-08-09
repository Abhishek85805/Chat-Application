import { createContext, useState } from "react";

export const ChatPageContext = createContext();

export const ChatPageProvider = (props) => {
    const [back, setBack] = useState(false);
    return (
        <ChatPageContext.Provider
        value={{
            back, 
            setBack, 
            greeting: "Kidda"
        }}>
            {props.children}
        </ChatPageContext.Provider>
    )
}