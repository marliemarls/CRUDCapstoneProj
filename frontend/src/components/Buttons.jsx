import React from 'react'

function Buttons({componentName}) {
  console.log(componentName);
    return (
    <>
    <button
    type='button'
    className=' text-black font-bold py-2 px-4 rounded'
    >{componentName}</button>
    </>
  )
}

export default Buttons