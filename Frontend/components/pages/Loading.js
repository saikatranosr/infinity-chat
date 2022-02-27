import React from 'react'

function Loading() {
    return (
        <div className="over noselect" id="loadingScreen">
            <div className="promptContainer row">
                <div className="spinner" />
                <p>Joining...</p>
            </div>
        </div>
    )
}

export default Loading