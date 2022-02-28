import React from 'react'
import Connection from '../scripts/Connection'


function Prompt(props) {
    const onSubmit = e => {
        e.preventDefault()
        let userName = e.target.elements.nameInp.value
        myPrompt.style.display = 'none'
        Connection(props.socketID, userName)
    }

    return (
        <div className="over noselect" id="myPrompt">
            <div className="promptContainer">
                <img alt="" src="/media/logo.svg" />
                <form className="content" id="nameForm" onSubmit={onSubmit}>
                    <label htmlFor="nameInp">Join as name...</label>
                    <input autoComplete="off" className="inp" id="nameInp" name='nameInp' type="text" />
                    <button className="btn btn-3" id="nameBtn" type="submit">Join</button>
                </form>
            </div>
        </div>
    )
}

export default Prompt