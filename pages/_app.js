import '../styles/style.css'
import {useState, useEffect} from 'react'
import ReactCSSTransitionGroup from 'react-transition-group';
import 'material-icons/iconfont/material-icons.css';
import ChatState from '../context/chats/chatState'

function MyApp({ Component, pageProps }) {
    useEffect(()=>{
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        window.addEventListener('resize', ()=>{
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        });
    })
  return (
    <ChatState>
        <Component {...pageProps} />
    </ChatState>
    )
    
}

export default MyApp