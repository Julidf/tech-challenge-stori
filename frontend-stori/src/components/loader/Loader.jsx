import React from 'react'
import "./Loader.css"

const Loader = ({text}) => {
  return (
    <div className='loading-container'>
        <div className="loader"></div>
        <div className='loading-text'>{text}</div>
    </div>
  )
}

export default Loader