import { useRouter } from 'next/router';
import { useContext } from 'react'
import chatContext from '../context/chats/chatContext'

export default function Login(){
    const {setUserName} = useContext(chatContext)
    const router = useRouter()
    const onSubmit = e => {
        e.preventDefault()
        setUserName(e.target.elements.nameInp.value)
        router.push("/")
    }

    return (
        <>
        <div className="over noselect" id="myPrompt">
            <div className="promptContainer">
                <img alt="" src="/media/logo.svg" />
                <form className="content" id="nameForm" onSubmit={onSubmit}>
                    <label htmlFor="nameInp">Join as...</label>
                    <input autoComplete="off" className="inp" id="nameInp" name='nameInp' type="text" />
                    <button className="btn btn-3" id="nameBtn" type="submit">Join</button>
                </form>
            </div>
        </div>
        </>
    )
}