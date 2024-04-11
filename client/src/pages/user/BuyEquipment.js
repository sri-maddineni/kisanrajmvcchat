import React from 'react'
import Nav from '../../components/UIComponents/Nav'
import Footer from '../../components/layouts/Footer'
import { NavLink } from 'react-router-dom';

const BuyEquipment = () => {

    const Breadcrumb = () => {
        return (
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><NavLink to="/">Home</NavLink></li>
                                       
    
                    <li className="breadcrumb-item active" aria-current="page">Buy Equipment</li>
                </ol>
            </nav>
        );
    };


  return (
    <>
        <Nav/>
        <Breadcrumb/>
        <div className="container" style={{minHeight:"45vh"}}>


        </div>
        <Footer/>
    </>
  )
}

export default BuyEquipment