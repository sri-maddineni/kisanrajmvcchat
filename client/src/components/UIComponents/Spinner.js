import React from 'react'
import fading from './Fading.gif'


export default function Spinner() {
  return (
    <>
    <div className="container text-center">
        <img style={{width:"10vh"}} src={fading} className='text-center my-3' alt="loading" />
    </div>
        
    </>
  )
}
