import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router';
import Script from 'next/script'
import { useEffect, useState, useContext } from 'react'
import Navbar from '../components/Navbar'
import Loading from '../components/Loading'
import DownArrow from '../components/DownArrow'
import SendContainer from '../components/SendContainer'
import UsersContainer from '../components/UsersConatiner.js'
import Chats from '../components/Chats'
import chatContext from '../context/chats/chatContext'

export default function Home() {
    const router = useRouter()
    const context = useContext(chatContext)
    const { connecting, Connection, userName } = context
    
    

    // Grid gridTemplateRows height (will be set from SendContainer component)
    const [newHeight, setNewHeight] = useState(40) 
    const [gridTemplateRows, setGridTemplateRows] = useState("")
    
    // CSS Media query for Layout Chnage
    const [mediaQuery, setMediaQuery] = useState("")
    
    const [unreadMessages, setUnreadMessages] = useState(0)
    const [loading, setLoading] = useState(true)
    
    // The the chat messages
    
    
    // ...

    useEffect(() => {
        // Checking for media query
        setMediaQuery(window.matchMedia('(max-width: 500px)'))
        
        // If name is emply redirect user to Login page
        if(router.isReady){
            if (userName.length===0) router.push('/login')
            else {
                setLoading(false)
                
            }
        }
        
    }, [])
    
    
    
    // Chnaging gridTemplateRows on mediaQuery chnage or New Height chnage
    useEffect(() => {
        if (mediaQuery.matches) setGridTemplateRows(`40px 50px 1fr ${newHeight+10}px`)
        else setGridTemplateRows(`40px 1fr ${newHeight+10}px`)
    }, [newHeight, mediaQuery])
    

  
    return (
        <>
        <Head>
            <title>Infinity Chat - The Real Chatroom by Saikat</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
      
        <div style={{gridTemplateRows}} className={`${styles.main} noselect`}>
            <Navbar />
            <UsersContainer />
            <Chats />
            
            { /*Sending socket to emit send-message event onSubmit*/}
            { <SendContainer newHeight={newHeight} setNewHeight={setNewHeight}/> }
            {Boolean(unreadMessages) && <DopwnArrow unreadMessages={unreadMessages} /> }
        </div>
         {loading && <Loading text="Loading"/> }
         {connecting && <Loading text="Connecting"/> }
        </>
    )
}