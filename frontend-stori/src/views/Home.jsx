import React from 'react'
import AddRecipients from '../components/add-recipients/AddRecipients'
import CreateNewsletter from '../components/create-newsletter/CreateNewsletter'
import "./Home.css"

function Home() {


  return (
    <div className='landing-container'>
        <AddRecipients />
        <CreateNewsletter />
    </div>
  )
}

export default Home