import React from 'react'

function Message(props) {
  return (
    <div className="message-full-container" {props.position}></div>
  )
}

export default Message