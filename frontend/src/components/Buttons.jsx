import React from 'react'

function Buttons({componentName}) {
  console.log(componentName);
    return (
    <>
    <button
    type='button'
    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
    >{componentName}</button>
    </>
  )
}

export default Buttons