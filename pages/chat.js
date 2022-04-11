import React from 'react'
import Link from 'next/link'

function chat({userName}) {
  return (
      <>
    <h1>Hello {userName}, Welcome to Chats</h1>
    <Link href='/'>Go to Home</Link>
    </>
  )
}

export default chat