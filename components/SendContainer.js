import { useContext, useEffect, useState } from 'react'
import styles from '../styles/SendContainer.module.css'
import chatContext from '../context/chats/chatContext'
import Connection from '../lib/chat/connection.js'

function SendContainer({newHeight, setNewHeight}) {
    
    const { chats, setChats, userName, myId, setMyId, users, setUsers} = useContext(chatContext)
    const [connection, setConnection] = useState(null)
    
    useEffect(()=>{
        let _connection = new Connection({chats, setChats, setMyId, users, setUsers}, userName)
        setConnection(_connection)
    }, [])
    useEffect(()=>{
        if (connection) {  connection.connectToIo()
        connection.socket.on('receive', data => {
                        
                        // Updating chats state with new message
                        let _messageObj = {
                            position: 'left',
                            message: {
                                id: data.msgId,
                                text: data.message,
                                timeStamp: data.timeStamp,
                                reciept: null,
                            },
                            sender: {
                                id: data.senderId,
                                name: this.users[data.senderId]['name'],
                            }
                        }
                      
                      alert(data.message)  
                    setChats(chats.concat(_messageObj))
    }) 
        }
        
    }, [connection])
    
    //Send the message
    const handleOnSubmit = e =>{ 
        //Prevent page reload
        e.preventDefault()
        
        // Message sending time
        const myDate = new Date();
        const timeStamp = `${(myDate.getHours()<10?'0':'')+(myDate.getHours())}:${(myDate.getMinutes()<10?'0':'')+(myDate.getMinutes())}`
        
        // Message text to be sent
        const message = e.target.elements.messageInp.value.trim();
       
       // Send message only if message is not empty
       if (message.length !== 0) { 
            // Generating message ID
            const msgId = `msg-${myId}-${Date.now()}`
            const senderId = `sender-${myId}`
            //Setting testarea and sendContainet height to defalt after sending a message
            setNewHeight(40)
            
            // Temporarily storing message object
            let _messageObj = {
                position: 'right',
                message: {
                    id: msgId,
                    text: message,
                    timeStamp,
                    reciept: 'done',
                },
                sender: {
                    id: senderId,
                    name: userName,
                }
            }
            
            // Updating chats state with new message
            setChats(chats.concat(_messageObj))
            connection.sendMessage(_messageObj)
            
            // Making textarea value empty
            e.target.elements.messageInp.value = ""
            
            // Prevent from removing focus from textarea
            e.target.elements.messageInp.focus()
            
        //   connection.sendMessage({message, msgId});
            
            
        }
        //Show alert if message if empty
        else {
            alert("Cannot send empty messgae")
            // Todo: Show custom alert
        }
    }
    
    
    
    // Send messgae on pressing evnter key but not on Shift+Enter
    const handleOnKeyPress = (event) => {
        if(event.which === 13 && !event.shiftKey){
            // console.log(event.target)
            handleOnSubmit({target: {elements: {messageInp: event.target}}, preventDefault: ()=>{}}) // Created a event object
            event.preventDefault(); // Prevents the addition of a new line in the text field
        }
    }
    
    const handleOnInput = (event) => {
        if(event.target.scrollHeight < 100){
            setNewHeight(event.target.scrollHeight)
        }
    }
    
    return (
        <form className={styles.send} onSubmit={handleOnSubmit}>
            <textarea
                autoComplete="off"
                className={styles.messageInp}
                name="messageInp"
                placeholder="Type a message..."
                onKeyPress={handleOnKeyPress}
                onInput={handleOnInput}
                style={{height: (newHeight) + 'px'}}
            />
            <button className={styles.sendBtn} type="submit">
                <span style={{position: "relative", left: "2px"}} className="material-icons-round">send</span>
            </button>
        </form>
    )
}

export default SendContainer