import React from 'react'

function Prompt() {
    const onSubmit = e => {
        e.preventDefault()
        myPrompt.style.display = 'none'
    }

    return (
        <div className="over noselect" id="myPrompt">
            <div className="promptContainer">
                <img alt="" src="/media/logo.svg" />
                <form className="content" id="nameForm" onSubmit={onSubmit}>
                    <label htmlFor="nameInp">Join as name...</label>
                    <input autoComplete="off" className="inp" id="nameInp" type="text" />
                    <button className="btn btn-3" id="nameBtn" type="submit">Join</button>
                </form>
            </div>
        </div>
    )
}

export default Prompt