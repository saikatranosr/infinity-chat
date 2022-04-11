import Message from './Message.js'
import styles from '../styles/Chats.module.css'
import { useState, useContext } from 'react'
import chatContext from '../context/chats/chatContext'

export default function Chats(){
    const {chats, setChats} = useContext(chatContext)
    // console.log(chats)
    return (
        <div className={styles.chats}>
            { chats.map((el) => {
                return <Message key={el.message.id} position={el.position} sender={el.sender} message={el.message}/>
            }) }
        </div>
        )
}