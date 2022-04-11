import ChatContext from "./chatContext";
import { useState } from "react";
import io from 'socket.io-client'

const ChatState = (props) => {
    const [users, setUsers] = useState({})
    const [myId, setMyId] = useState("")
        // On page load
    const [userName, setUserName] = useState("")
    
    // On socket connection
    const [connecting, setConnecting] = useState(false)
    
    const [chats, setChats] = useState([])
        const initialChats = [{
            position: 'left',
            message: {
                id: "Slajdbfhfjfbf",
                text: "I am a message",
                timeStamp: "12:09",
                reciept: 'done_all',
            },
            sender: {
                id: 'd9dy9fyhdhd',
                name: "Message",
            }
        }]
        
        // connection to Io server
        
    return (
        <ChatContext.Provider value={{ connecting, setConnecting, chats, setChats, users, setUsers, myId, userName, setUserName }}>
        {props.children}
        </ChatContext.Provider>
    )

}
export default ChatState;