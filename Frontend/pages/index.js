import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Script from 'next/script'
import { useEffect } from 'react'
import io from 'socket.io-client'
import Navbar from '../components/pages/Navbar.js'
import Prompt from '../components/pages/Prompt'
import Loading from '../components/pages/Loading'
import SendContainer from '../components/pages/SendContainer'
let socket

export default function Home() {
  useEffect(() => {
    fetch('/api/socketio').finally(() => {
      socket = io()
    })
  })
  return (
    <div className={styles.container}>
      <Head>
        <title>Infinity Chat - The Real Chatroom by Saikat</title>
        <link rel="icon" href="/favicon.ico" />
        <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet' />
        {/* <script src='/js/myfoos.js' defer /> */}
      </Head>
      {/* <Script src="localhost:3000/socket.io/socket.io.js" /> */}
      {/* <Script src='/js/external_functions.js' strategy='lazyOnload' />
      <Script src='/js/main.js' /> */}
      {/* <Script src='/js/connection.js' /> */}
      <div className="main noselect">
      <Navbar/>
      <div className="users noselect" />
      <div className="chats">
      {
        
      }
      </div>
      <SendContainer/>
    </div>
    <div className="end noselect" id="goToEnd">
      <span className="material-icons" id="goToEndBtn">arrow_downward</span>
      <span id="msgCount" />
    </div>
    {/* <Loading/> */}
    <Prompt socketID={socket}/>
    </div>
  )
}
