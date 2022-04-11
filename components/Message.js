import React from 'react'
import styles from '../styles/Message.module.css'
import { isEmoji } from '../lib/scripts/functions.js'

function Message({position, sender, message}) {
    

    const messageContainerOnClick = (event) => {
        
    }
    const messageContainerOnContextMenu = (event) => {
        
    }
    const handleMouseUp = (event) => {
        
    }

  let messageFontSize;
  let messageAnimation;
  
    if(isEmoji(message.text)){
    messageFontSize = '2rem';
    messageAnimation = 'none';
  }
  else if(message.text == '❤️'){
    messageFontSize = '5rem';
    messageAnimation = 'heartbeat 1s alternate infinite'
  }
  else{
    messageFontSize = '1rem';
    messageAnimation = 'none';
  }
  
  let msgStyle = {
      fontSize: messageFontSize,
      animation: messageAnimation
    }
  
  return (
    <div className={`${styles.messageFullContainer} ${styles[position]}`} id={message.id}>
        <div className={styles.messageContainerWithInfo}>
            <div
                className={styles.messageContainer}
                onClick={messageContainerOnClick} 
                onContextMenu={messageContainerOnContextMenu}
                onMouseUp={handleMouseUp}
                
            >
                <div className={styles.senderContainer}>
                    <span className={styles.senderName} id={sender.id}>{sender.name}</span>
                </div>
                <div className={styles.onlyMessageConainer}>
                    <span style={msgStyle} className={styles.message}>{message.text}</span>
                </div>
            </div>
            <div className={styles.messageInfo}>
                <span className={styles.timeStamp}>{message.timeStamp}</span>
                <span className={`${styles.messageRead} material-icons`}>{message.reciept}</span>
            </div>
        </div>
    </div>
  )
}

export default Message