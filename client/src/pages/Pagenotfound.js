import React from 'react'
import { useNavigate } from 'react-router-dom'
import Nav from '../components/UIComponents/Nav';
import Footer from '../components/layouts/Footer';

export const Pagenotfound = () => {
  const navigate=useNavigate();
  return (
    <>
    <Nav/>
      <div className="text-center m-3" style={{minHeight:"50vh"}}>
        <h1 className='m-3'>404</h1>
        <h1 className='m-3'>Page Yet to develop</h1>
        <button className='btn btn-lg btn-outline-dark' onClick={()=>{navigate(-1)}}>go back</button>
      </div>
    <Footer/>
    </>)

}