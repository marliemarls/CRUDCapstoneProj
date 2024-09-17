import React from 'react'
import Buttons from './Buttons.jsx'

function Navbar() {
  return (
    <>
    <div className='flex justify-center items-center'>
    <Buttons componentName='Home'/>
    <Buttons componentName='About' />
    <Buttons componentName='Contact'/>
    </div>
    </>
  )
}

export default Navbar