import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div>
        <h1>404 You are lost</h1>
        <Link to="/">Go back Home</Link>
    </div>
  )
}

export default NotFound