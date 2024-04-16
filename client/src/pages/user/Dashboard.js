import React from 'react'
import Header from '../../components/layouts/Header'
import Footer from '../../components/layouts/Footer'
import UserMenu from './UserMenu'
import Navbar from '../../components/UIComponents/Navbar'
import Nav from '../../components/UIComponents/Nav'


const Dashboard = () => {

    return (
        <>
            <Nav />
            <div className="container-fluid">
                <div className="container" style={{minHeight:"50vh"}}>
                    <h1 className='text-center m-5'>User dashboard</h1>
                </div>


            </div>

            <Footer />

        </>
    )
}

export default Dashboard