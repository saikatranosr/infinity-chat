import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Script from 'next/script'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Infinity Chat - The Real Chatroom by Saikat</title>
        <link rel="icon" href="/favicon.ico" />
        <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet' />
      </Head>
      <Script src="http://localhost:8000/socket.io/socket.io.js" />
      <Script src='/js/external_functions.js' />
      <Script src='/js/myfoos.js' />
      <Script src='/js/connection.js' />
      <Script src='/js/main.js' />
      <div className="main noselect">
      <nav>
        <div className="titleContainer">
          <img alt="logo" className="logo" src="/media/logo.svg" />
          <p id="title">Infinity Chat</p>
        </div>
        <div>
          <span className="material-icons" id="more-menu">more_vert</span>
        </div>
      </nav>
      <div className="users noselect" />
      <div className="chats" />
      <form action="#" className="send">
        <textarea
          autoComplete="off"
          id="messageInp"
          name="messageInp"
          placeholder="Type a message..."
        />
        <button id="sendBtn" type="submit">
          <span className="material-icons">send</span>
        </button>
      </form>
    </div>
    <div className="end noselect" id="goToEnd">
      <span className="material-icons" id="goToEndBtn">arrow_downward</span>
      <span id="msgCount" />
    </div>
    <div className="over noselect" id="loadingScreen">
      <div className="promptContainer row">
        <div className="spinner" />
        <p>Joining...</p>
      </div>
    </div>
    <div className="over noselect" id="myPrompt">
      <div className="promptContainer">
        <img alt="" src="/media/logo.svg" />
        <form className="content" id="nameForm">
          <label htmlFor="nameInp">Join as...</label>
          <input autoComplete="off" className="inp" id="nameInp" type="text" />
          <button className="btn btn-3" id="nameBtn" type="submit">Join</button>
        </form>
      </div>
    </div>
    </div>
  )
}
