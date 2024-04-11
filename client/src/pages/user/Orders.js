import React from 'react'
import UserMenu from './UserMenu'
import Header from '../../components/layouts/Header'
import Footer from '../../components/layouts/Footer'
import Nav from '../../components/UIComponents/Nav'
import { NavLink } from 'react-router-dom'

const Orders = () => {

    const Breadcrumb = () => {
        return (
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><NavLink to="/">Home</NavLink></li>
                    <li className="breadcrumb-item"><NavLink to="/dashboard/user/profile">Profile</NavLink></li>
                    
    
                    <li className="breadcrumb-item active" aria-current="page">orders</li>
                </ol>
            </nav>
        );
    };

    return (
        <>
            <Nav />
            <Breadcrumb/>
            <div className="container" style={{minHeight:"50vh"}}>

            </div>
            <Footer />
        </>
    )
}

export default Orders