import React from 'react'

function SendContainer() {
    const onSubmit = e =>{
        e.preventDefault()
    }

    return (
        <form action="#" className="send" onSubmit={onSubmit}>
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
    )
}

export default SendContainer