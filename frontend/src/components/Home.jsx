import React from 'react'
import Navbar from './Navbar.jsx'

function Home() {
  return (
    <>
    <Navbar />

    <div className='container'>

      <div className='row'>
        <div className='col-md-6'>
          <img src={"./images/d017078e6e6238e2d273c673e84fd7b3.png"} />
          <h1>Hi</h1>
          <p>how are you</p>  
        </div>
      </div>
    </div>
    <p>Home</p>

    </>
  )
}

export default Home